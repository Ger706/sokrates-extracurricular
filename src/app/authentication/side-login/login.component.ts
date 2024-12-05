import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Auth} from "../../../shared/models/auth.model";
import {SettingService} from "../../../shared/services/setting.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {WebsiteService} from "../../../shared/services/website.service";
import {UserService} from "../../../shared/services/user.service";
import {faEye, faEyeSlash, faRefresh, faUser, faLock} from "@fortawesome/free-solid-svg-icons";
interface SocialiteParams {
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('templateVerifyMFA', {static: true}) public modalTemplateVerifyMFA: NgbModalRef;

  loginForm: FormGroup;
  errorMsg: null;
  loading = false;
  loadingMfa = false;
  passwordType = 'password';
  forgotPasswordLink = null;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faUser = faUser;
  faRefresh = faRefresh;
  faLock = faLock;
  private auth: Auth;
  captchaLoading = true;
  captchaIsValid = false;
  captcha = {
    key: null,
    img: null,
  };

  captchaNew = {
    svg: null,
    key: null,
  };
  interval: any;

  mfa = null;
  type = 'password';
  token = [];

  constructor(
      private settings: SettingService,
      private userService: UserService,
      private router: Router,
      private route: ActivatedRoute,
      private authService: AuthService,
      private websiteService: WebsiteService,
      private sanitizer: DomSanitizer,
      private ref: ChangeDetectorRef,
      private settingService: SettingService,
      private modalService: NgbModal
  ) {
    // @ts-ignore
    this.forgotPasswordLink = this.settings.getConfig('auth.url') + '/forgot-password';
  }

  ngOnInit() {
    this.captchaRefresh();
    this.interval = setInterval(() => {
      this.captchaRefresh();
    }, 120000);

    // this.getCaptcha();

    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      captcha: new FormControl(null, [Validators.required])
    });
  }

  captchaRefresh() {
    this.captchaLoading = true;

    this.captchaNew.key = null;
    this.captchaNew.svg = null;

    this.authService.captcha()
        .subscribe(res => {
          if (res.status && !!res.data) {
            this.captchaNew.key = res.data.key;
            // @ts-ignore
            this.captchaNew.svg = this.sanitizer.bypassSecurityTrustHtml(res.data.svg);
          } else {
            this.captchaNew.svg = null;
          }
          this.captchaLoading = false;
          this.ref.detectChanges();
        }, (err: any) => {
          this.captchaLoading = false;
          this.captchaNew.svg = null;
          this.ref.detectChanges();
        });
  }

  getCaptcha() {
    this.captchaLoading = true;
    this.authService.getCaptcha()
        .subscribe((response: any) => {
          this.captcha.img = response['img'];
          this.captcha.key = response['key'];
          this.captchaLoading = false;
        }, (err: any) => {
          // @ts-ignore
          this.errorMsg = 'errInvalidCaptcha';
          this.captchaLoading = false;
        });
  }

  onHideOrShowPassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  onSubmit(form: FormGroupDirective) {
    if (form.invalid) {
      return;
    }

    const value = form.value;
    this.loading = true;
    this.errorMsg = null;

    const captcha = {
      value: value.captcha.toUpperCase(),
      key: this.captchaNew.key,
    };

    this.userService.lookupTenantHostnameByUsername(value.username, captcha.key)
        .subscribe((res: { error: number; result: { data: any; }; })=> {
          if (res.error === 0) {
            const website = res.result.data;
            this.websiteService.select(website);

            this.authService.login(value.username, value.password, captcha)
                .subscribe(res2 => {
                  // @ts-ignore
                  if (res2.error === 0) {
                    // @ts-ignore
                    if (res2.result.data.mfa && res2.result.data.mfa !== 'none') {
                      // @ts-ignore
                      this.mfa = res2.result.data.mfa.toUpperCase();
                      this.loading = false;
                      this.modalService.open(this.modalTemplateVerifyMFA, {
                        ariaLabelledBy: 'modal-basic-title',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg'
                      }).result.then((result: any) => {
                        // this.closeResult = `Closed with: ${result}`;
                      }, (reason: any) => {
                        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                      });
                    } else {
                      // Get Timezone
                      // @ts-ignore
                      this.userService.getTimezone(res2.result.data.token.access_token)
                          .subscribe((res3: { error: number; result: { data: { timezone: string; }; }; }) => {
                            if (res3.error === 0) {
                              const timezone = res3.result.data.timezone || 'Etc/GMT-7';
                              this.settingService.setConfig('timezone', timezone);
                            } else {
                              this.settingService.setConfig('timezone', 'Etc/GMT-7');
                            }
                          });
                      // @ts-ignore
                      this.authService.loginSelect(res2.result.data);
                      // @ts-ignore
                      this.authService.setPermissions(res2.result.data, true, true);
                    }
                  } else {
                    this.captchaRefresh();
                    // @ts-ignore
                    this.errorMsg = 'Invalid Credential!';
                    this.loading = false;
                  }
                }, err => {
                  const errorMsg = err['error']['message'];
                  if (errorMsg === 'errInvalidCaptcha') {
                    // @ts-ignore
                    this.errorMsg = 'Invalid Captcha!';
                  } else {// @ts-ignore

                    this.errorMsg = 'Invalid Credential!';
                  }
                  this.captchaRefresh();
                  this.loading = false;
                });

          } else {
            // @ts-ignore
            this.errorMsg = 'Username not found!';
            this.captchaRefresh();
            this.loading = false;
          }
        }, (err: any) => {
          this.captchaRefresh();
          this.loading = false;
          // @ts-ignore
          this.errorMsg = 'Username not found!';
        });
  }

  onHideOrShowPin() {
    this.type = this.type === 'password' ? 'text' : 'password';
  }

  onOtpChange(item: any) {
    this.token = item;
  }

  onVerifySecret() {
    this.loadingMfa = true;
    // @ts-ignore
    this.authService.verifyMFA(this.token, this.mfa, this.loginForm.value.username, this.loginForm.value.password).subscribe(
        (response: any) => {
          if (response.status) {
            this.authService.loginSelect(response.result.data);
            this.authService.setPermissions(response.result.data, true, true);
            this.modalService.dismissAll();
          } else {
            this.loadingMfa = false;
            this.modalService.dismissAll();
            // @ts-ignore
            this.errorMsg = 'Invalid Credential';
            this.captchaRefresh();
          }
        },
        err => {
          // this.toastr.error('[Social detail] Cannot access server endpoint!', 'Connection Error');
        });
  }
}
