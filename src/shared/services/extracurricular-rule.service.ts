import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {SettingService} from "./setting.service";
import {ExtracurricularRule} from "../models/extracurricular-rule.model";

@Injectable()
export class ExtracurricularRuleService {
  exculRuleChanged = new Subject<ExtracurricularRuleService[]>();

  constructor(private settings: SettingService,
              private http: HttpClient) {
  }

  addRule(exculRule: ExtracurricularRule) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/rule';

    return this.http.put<ExtracurricularRule>(requestUrl,
      JSON.parse(JSON.stringify(exculRule)),
      this.settings.httpOptionWithToken());
  }

  updateRule(id: number, newRule: ExtracurricularRule) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/rule/' + id;

    return this.http.patch<ExtracurricularRule>(requestUrl,
      JSON.parse(JSON.stringify(newRule)),
      this.settings.httpOptionWithToken());
  }

  getRules(page: number): Observable<ExtracurricularRule> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer' + '/extracurricular/rule?page=' + page;

    return this.http.get<ExtracurricularRule>(requestUrl, this.settings.httpOptionWithToken());
  }

  getFilteredRule(param: Object): Observable<ExtracurricularRule> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/rule/filtered';

    return this.http.post<ExtracurricularRule>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }

  getActiveRules(): Observable<ExtracurricularRule> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer' + '/extracurricular/rule/active';

    return this.http.get<ExtracurricularRule>(requestUrl, this.settings.httpOptionWithToken());
  }


  getActiveMappingRules(): Observable<ExtracurricularRule> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer' + '/extracurricular/rule/active-mapping';

    return this.http.get<ExtracurricularRule>(requestUrl, this.settings.httpOptionWithToken());
  }

  getRule(id: number) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/rule/' + id;

    return this.http.get<ExtracurricularRule>(requestUrl, this.settings.httpOptionWithToken());
  }

  deleteRule(id: number) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/rule/' + id;

    return this.http.delete<ExtracurricularRule>(requestUrl, this.settings.httpOptionWithToken());
  }
}
