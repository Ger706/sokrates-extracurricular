import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import {SettingService} from "./setting.service";
import {UserRoleModel} from "../models/user_role.model";

@Injectable()
export class UserService {
  constructor(private settings: SettingService,
              private http: HttpClient) {
  }

  getUsers() {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/users';

    return this.http.get<User>(requestUrl, this.settings.httpOptionWithToken());
  }

  getUsersFilteredByRoles(param: any): Observable<any> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/users/filtered-by-roles';

    return this.http.post<User>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }

  getFilteredUser(param: any): Observable<any> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/users/filtered';

    return this.http.post<User>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }

  getUser(id: number): Observable<User> {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/users/${id}`;

    return this.http.get<User>(requestUrl, this.settings.httpOptionWithToken());
  }

  getUserFullDetail(id: number): Observable<User> {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/users/${id}/full`;

    return this.http.get<User>(requestUrl, this.settings.httpOptionWithToken());
  }

  getUserRoles(id: number): Observable<Array<UserRoleModel>> {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/users/${id}/roles`;

    return this.http.get<Array<UserRoleModel>>(requestUrl, this.settings.httpOptionWithToken());
  }

  getRoleName(id: number): Observable<any> {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/users/${id}/role-name`;

    return this.http.get<any>(requestUrl, this.settings.httpOptionWithToken());
  }

  userDetailByUserId(studentId: number): Observable<any> {
    const url = this.settings.getConfig('client.url') + `/customer/users/students/${studentId}`;
    return this.http.get<any>(url, this.settings.httpOptionWithToken());
  }

  saveUserRoles(id: number, param: Array<UserRoleModel>): Observable<Array<UserRoleModel>> {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/users/${id}/roles`;

    return this.http.post<Array<UserRoleModel>>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }

  resetPassword(id: number): Observable<User> {
    // const requestUrl = this.settings.getConfig('client.url') + `/customer/users/${id}/reset-password`;
    const requestUrl = this.settings.getConfig('api.url') + `/auth-http/v2/users/${id}/reset-password`;


    return this.http.get<User>(requestUrl, this.settings.httpOptionWithToken());
  }

  resetMultiplePassword(param: Array<number>): Observable<User> {
    // const requestUrl = this.settings.getConfig('client.url') + `/customer/users/reset-multiple-password`;
    const requestUrl = this.settings.getConfig('api.url') + '/auth-http/v2/users/reset-multiple-password';


    return this.http.post<any>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }

  getUserSettings(id: number): Observable<Array<any>> {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/users/${id}/settings`;

    return this.http.get<Array<any>>(requestUrl, this.settings.httpOptionWithToken());
  }

  saveUserSetting(id: number, data: any): Observable<any> {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/users/${id}/settings`;

    return this.http.post<any>(requestUrl, data, this.settings.httpOptionWithToken());
  }

  getParentChildren(id: number) {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/users/${id}/children`;

    return this.http.get<Array<any>>(requestUrl, this.settings.httpOptionWithToken());
  }

  getFilteredUserForSurvey(param: any): Observable<any> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/users/filtered-survey';

    return this.http.post<User>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }

  getMaximumData(param: any): Observable<any> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/users/maximum';

    return this.http.post<any>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }

  getLibraryFilteredUser(param: any): Observable<any> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/users/library/filtered';

    return this.http.post<User>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }

  lookupTenantHostnameByUsername(username: any, key: null) {
    // const requestUrl = this.settingService.getConfig('system.url') + `/system/users/tenant?username=${username}&key=${key}`;
    const requestUrl = this.settings.getConfig('api.url') + `/auth-http/v2/login-lms/system/users/tenant?username=${username}&key=${key}`;
    // const requestUrl = `http://localhost:3000/auth-http/v2/login-lms/system/users/tenant?username=${username}&key=${key}`;

    // const $params = new HttpParams()
    //   .set('username', username);
    return this.http.get<any>(requestUrl, {
      headers: this.settings.httpOptionWithToken().headers,
      // params: $params
    });
  }
  getTimezone(token?: any) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/dashboard/teacher/academic-year';
    if (token) {
      return this.http.post<any>(requestUrl, {}, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      });
    } else {
      return this.http.post<any>(requestUrl, {}, this.settings.httpOptionWithToken());
    }
  }
}
