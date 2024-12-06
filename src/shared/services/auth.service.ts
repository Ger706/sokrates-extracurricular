import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

import {Auth} from '../models/auth.model';
import {SettingService} from './setting.service';
import {Token} from '../models/token.model';
import {ToastrService} from 'ngx-toastr';
import {catchError, map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {LocalStorageService} from "./localstorage.service";

interface PermissionDataModel {
  permissions: any;
  permissions_roles: any;
}

@Injectable()
export class AuthService {

  public permissions: any = {};
  public permissionsRoles: any = {};
  private permissionsAsArray: Array<string> | undefined;
  private hasLoadedPermission = false;
  private auth: Auth | null | undefined;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public service = 'auth-http';
  public urlAuthV2 = '/v2';


  constructor(private http: HttpClient,
              private router: Router,
              private settings: SettingService,
              private localStorage: LocalStorageService,
              private toastr: ToastrService
  ) {
    this.hasLoadedPermission = false;
  }

  get isLoggedIn() {
    if (this.settings.getConfig('client.auth') !== null) {
      return true;
    }

    return false;
  }

  get isInternalCandidate() {
    const auth = this.settings.getConfig('client.auth');
    // @ts-ignore
    if (auth && auth['isInternalCandidate'] === true) {
      return true;
    }

    return false;
  }

  // getAuthApi() {
  //   const hostname = this.settings.getConfig('client.hostname');
  //   const subdomain = hostname.split('.')[0];

  //   const apiUrl = this.settings.getConfig('api.url');

  //   const changedUrl = apiUrl.replace('api', subdomain + '.api');

  //   return changedUrl;
  // }

  check(full = false): Observable<any> {
    const url = this.settings.getConfig('client.url') + '/customer/auth/check';
    // const url = this.settings.getConfig('api.url') + '/auth-http/v2/login-monolit/customer/auth/check_v2';
    // const url = 'http://localhost:3000/auth-http/v2/login-monolit/customer/auth/check_v2';

    const $params = new HttpParams()
      .set('full', String(full));

    return this.http.get<any>(url, {
      headers: this.settings.httpOptionWithToken().headers,
      params: $params
    });
  }

  checkBlocked() {
    const url = this.settings.getConfig('client.url') + '/customer/auth/blocked';
    return this.http.get<any>(url, this.settings.httpOptionWithToken())
      .pipe(
        this.localStorage.localStorageCacheHttp(url)
      );
  }

  login(username: string, password: string, captcha: any): Observable<Auth> {
    // const url = this.settings.getConfig('client.url') + '/customer/auth/login-direct';
    const url = this.settings.getConfig('api.url') + '/auth-http/v2/login-monolit/customer/auth/login-direct';
    // const url = 'http://localhost:3000/auth-http/v2/login-monolit/customer/auth/login-direct';

    return this.http.post<Auth>(url, {
      username: username,
      password: password,
      client_url: this.settings.getConfig('client.hostname'), ...captcha
    });
  }

  getMFASecret(deviceAlias: string): Observable<any> {
    const url = this.settings.getConfig('api.url') + '/auth-http/v2/generate-mfa-secret';
    // const url = 'http://localhost:3000/auth-http/v2/generate-mfa-secret';
    return this.http.post<Auth>(url, {device_alias: deviceAlias}, this.settings.httpOptionWithToken());
  }

  activateMFASecret(token: number): Observable<any> {
    const url = this.settings.getConfig('api.url') + '/auth-http/v2/activate-mfa-secret';
    // const url = 'http://localhost:3000/auth-http/v2/activate-mfa-secret';
    return this.http.post<Auth>(url, {token: token}, this.settings.httpOptionWithToken());
  }

  generatePIN(pin: any): Observable<any> {
    const url = this.settings.getConfig('api.url') + '/auth-http/v2/enable-pin-mfa';
    // const url = 'http://localhost:3000/auth-http/v2/enable-pin-mfa';
    return this.http.post<Auth>(url, {pin: pin.pin, confirm_pin: pin.confirmPin}, this.settings.httpOptionWithToken());
  }

  updatePIN(pin: any): Observable<any> {
    const url = this.settings.getConfig('api.url') + '/auth-http/v2/enable-pin-mfa';
    // const url = 'http://localhost:3000/auth-http/v2/update-pin';
    return this.http.post<Auth>(url, {pin: pin.pin, confirm_pin: pin.confirmPin, old_pin: pin.oldPin}, this.settings.httpOptionWithToken());
  }

  verifyMFA(token: number, tokenType: string, username: string, password: string): Observable<any> {
    const url = this.settings.getConfig('api.url') + '/auth-http/v2/authless/verify-mfa';
    // const url = 'http://localhost:3000/auth-http/v2/authless/verify-mfa';
    return this.http.post<Auth>(url, {
      token: token,
      token_type: tokenType,
      username: username,
      password: password,
      client_url: this.settings.getConfig('client.hostname'),
    });
  }

  getDetailMfa(): Observable<any> {
    const url = this.settings.getConfig('api.url') + '/auth-http/v2/check-mfa';
    // const url = 'http://localhost:3000/auth-http/v2/check-mfa';
    return this.http.get<Auth>(url, this.settings.httpOptionWithToken());
  }

  change(userId: number): Observable<Auth> {
    const url = this.settings.getConfig('client.url') + '/customer/auth/change';
    // const url = this.settings.getConfig('api.url') + '/auth-http/v2/login-monolit/customer/auth/change';
    // const url = 'http://localhost:3000/auth-http/v2/login-monolit/customer/auth/change';

    return this.http.post<Auth>(url, {user_id: userId}, this.settings.httpOptionWithToken());
  }

  logout(sessionWarning = false) {

    if (sessionWarning) {
      this.toastr.warning('Please re-login to renew your session!', 'Session Expired', {
        disableTimeOut: true,
        closeButton: true
      });
    }

    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      showCancelButton: false,
    });
    Swal.showLoading();

    const requestUrl = this.settings.getConfig('client.url') + '/customer/auth/logout';
    this.http.post<any>(requestUrl, {}, this.settings.httpOptionWithToken())
      .subscribe((response: any) => {
        if (response['error'] === 0) {

        } else {

        }
        Swal.close();
        this.settings.resetAll();
        window.location.reload();
      }, error => {
        Swal.close();
        this.settings.resetAll();
        window.location.reload();
      });
  }

  refreshToken() {
    const url = this.settings.getConfig('client.url') + '/customer/auth/refresh';

    return this.http.post<any>(url, null, this.settings.httpOptionWithToken());
  }

  updateToken(token: Token) {
    const auth = (JSON.parse(<string>this.settings.getConfig('client.auth')) as Auth) || null;
    auth.token = token;
    this.settings.setConfig('client.auth', JSON.stringify(auth));

    // @ts-ignore
    this.settings.setToken(token.access_token);
  }

  loginSelect(auth: Auth, token = null) {
    this.auth = auth;
    if (auth.token.access_token !== null) {
      this.settings.setConfig('client.authReal', JSON.stringify(auth));
      this.settings.setConfig('client.auth', JSON.stringify(auth));
      if (!token) {
        // @ts-ignore
        this.settings.setToken(this.auth.token.access_token);
        // @ts-ignore
        this.settings.setTokenNext(this.auth?.token_next);
        // @ts-ignore
        this.settings.setUrlNext(this.auth?.url_next);
      }
      this.settings.setConfig('client.isInternalCandidate', this.auth.isInternalCandidate);
      this.settings.setConfig('client.survey_id', this.auth.survey_id);

      this.router.navigate(['/layout/home']);
    }

    this.auth = null;
  }

  select(auth: Auth) {
    this.auth = auth;
    if (auth.token.access_token !== null) {
      this.settings.setConfig('client.auth', JSON.stringify(auth));
      // @ts-ignore
      this.settings.setToken(this.auth.token.access_token);
      // @ts-ignore
      this.settings.setTokenNext(this.auth?.token_next);
      // @ts-ignore
      this.settings.setUrlNext(this.auth?.url_next);
      if (window.location.pathname.includes('dashboard')) {
        // Validasi untuk dashboard
        this.router.navigate(['client/layout/dashboard/']);
      } else {
        // Validasi to other menu
        this.router.navigate([window.location.pathname]);
        window.location.reload();
      }
    }

    this.auth = null;
  }

  current(): Auth {
    return this.auth = JSON.parse(<string>this.settings.getConfig('client.auth')) || null;
  }

  updateSetting(key: string, value: string) {
    const auth = (JSON.parse(<string>this.settings.getConfig('client.auth')) as Auth) || null;
    auth.setting[key] = value;

    this.settings.setConfig('client.auth', JSON.stringify(auth));
  }

  clearSurveyUser() {
    const auth = (JSON.parse(<string>this.settings.getConfig('client.auth')) as Auth) || null;
    auth.survey_id = null;

    this.settings.setConfig('client.auth', JSON.stringify(auth));
  }

  isCandidate() {
    return this.current().roles.includes('CANDIDATE');
  }


  getSetting(key: string): string | null {
    if (!this.current()) {
      return null;
    }

    const setting = this.current().setting as Object;

    if (!setting) {
      return null;
    }

    if (!setting.hasOwnProperty(key)) {
      return null;
    }

    // @ts-ignore
    return setting[key];
  }

  setPermissions(permission: PermissionDataModel, loadPermission = true, isLogin = false) {
    this.settings.setConfig('client.auth.permissions', JSON.stringify(permission.permissions));
    this.settings.setConfig('client.auth.permissions_roles', JSON.stringify(permission.permissions_roles));

    if (isLogin) {
      this.settings.setConfig('client.authReal.permissions', JSON.stringify(permission.permissions));
      this.settings.setConfig('client.authReal.permissions_roles', JSON.stringify(permission.permissions_roles));
    }

    if (!loadPermission) {
      return;
    }

    this.loadPermissions(true);
  }

  loadPermissionsAsync() {
    const url = this.settings.getConfig('client.url') + '/customer/auth/permissions?with_role=true';
    // const url = this.settings.getConfig('api.url') + '/auth-http/v2/login-monolit/customer/auth/permissions?with_role=true';
    // const url = 'http://localhost:3000/auth-http/v2/login-lms/customer/auth/permissions?with_role=true';

    return this.http.get<any>(url, this.settings.httpOptionWithToken())
      .pipe(
        this.localStorage.localStorageCacheHttp(url)
      )
      .pipe(map(async res => {
        // @ts-ignore
        if (res['error'] === 0) {
          // @ts-ignore
          return res['result']['data'];
        } else {
          // @ts-ignore
          if (res['message'] === 'User Not Found') {
            // Asumsinya kalo token tidak valid, minta login ulang
            this.settings.resetAll();
            window.location.href = '/';
          }
          return throwError(res);
        }
      }), catchError((err, caught) => {
        return throwError(err);
      })).toPromise();
  }

  async loadPermissions(refresh = false) {
    if (!refresh) {
      if (this.hasLoadedPermission) {
        return;
      }

      try {
        this.permissions = JSON.parse(<string>this.settings.getConfig('client.auth.permissions'));
        this.permissionsRoles = JSON.parse(<string>this.settings.getConfig('client.auth.permissions_roles'));

        if (!this.permissions || !this.permissionsRoles) {
          this.loadPermissions(true);
          return;
        } else {
          this.hasLoadedPermission = true;
        }
      } catch (e) {
        this.permissions = {};
        this.permissionsRoles = {};

        this.loadPermissions(true);
        return;
      }

    } else {
      try {

        const res = await this.loadPermissionsAsync();

        this.permissions = res['permissions'];
        this.permissionsRoles = res['permissions_roles'];
      } catch (err) {
        this.permissions = JSON.parse(<string>this.settings.getConfig('client.auth.permissions')) || {};
        this.permissionsRoles = JSON.parse(<string>this.settings.getConfig('client.auth.permissions_roles')) || {};
      }

      this.setPermissions({permissions: this.permissions, permissions_roles: this.permissionsRoles}, false);
    }

    this.permissionsAsArray = Object.entries(this.permissions).filter(i => i[1] === true).map(i => i[0]);
  }

  sendEmailVerification(body = {}): Observable<Auth> {
    const url = this.settings.getConfig('client.url') + '/customer/auth/email/resend';

    return this.http.post<Auth>(url, body, this.settings.httpOptionWithToken());
  }

  emailUpdateVerification(body = {}): Observable<Auth> {
    const url = this.settings.getConfig('client.url') + '/customer/auth/email/email-update';

    return this.http.post<Auth>(url, body, this.settings.httpOptionWithToken());
  }

  loginByTokenSocialite(param: any) {
    const url = this.settings.getConfig('client.url') + '/customer/auth/social/login';

    return this.http.post<Auth>(url, param, this.settings.httpOptionWithToken());
  }
  renewDeleteSession(param: any) {
    const url = this.settings.getConfig('api.url') + '/auth-http/v2/session/renew-delete';

    return this.http.post<Auth>(url, param, this.settings.httpOptionWithToken());
  }
  kilAllSession(param: any) {
    const url = this.settings.getConfig('api.url') + '/auth-http/v2/session/kill-all-session';
    // const url = 'http://localhost:3009/auth-http/v2/session/kill-all-session';

    return this.http.post<Auth>(url, param, this.settings.httpOptionWithToken());
  }
  socialDetail() {
    const url = this.settings.getConfig('client.url') + '/customer/auth/social/detail';

    return this.http.post<Auth>(url, null, this.settings.httpOptionWithToken());
  }

  socialDisconnect(param: any) {
    const url = this.settings.getConfig('client.url') + '/customer/auth/social/disconnect';

    return this.http.post<Auth>(url, param, this.settings.httpOptionWithToken());
  }

  loadSocialiteProviders() {
    // load Activated Social Button per tenant
    const socialiteProviders = this.settings.getWebSettings().socialite_providers;
    if (socialiteProviders != null) {
      const obj = {};
      socialiteProviders
        .replace(/\s/g, '')
        .split(',')
        .forEach((socialiteProvider: string | number) => {
          // @ts-ignore
          obj[socialiteProvider] = true;
        });
      return obj;
    }
    return {};
  }

  setMenuTask(res: { [x: string]: any; }) {
    if (!this.permissionsRoles[res['task']]) {
      return;
    }
    const roleIds = this.permissionsRoles[res['task']];

    this.settings.setConfig('client.auth.current_menu_task', JSON.stringify({
      task: res['task'],
      url: res['url'],
      role_ids: roleIds
    }));
  }

  getMenuTaskRoles() {
    let res: any = this.settings.getConfig('client.auth.current_menu_task');
    let roleIds = '';
    try {
      res = JSON.parse(res);
      roleIds = (res.role_ids as Array<number>).join(',');
    } catch (e) {
    }
    return roleIds;
  }
  getCaptcha() {
    const requestUrl = this.settings.getConfig('system.url') + '/captcha/api';
    return this.http.get<any>(requestUrl, this.settings.httpOptionWithToken());
  }

  captcha() {
    const url = this.settings.getConfig('api.url') + `/${this.service}${this.urlAuthV2}/captcha`;
    return this.http.get<any>(url);
  }
}
