import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { YearLevelMapping } from '../models/year-level-mapping.model';
import {SettingService} from "./setting.service";

@Injectable()
export class YearLevelMappingService {

  yearLevelMappingChanged = new Subject<YearLevelMapping[]>();

  constructor(private settings: SettingService,
              private http: HttpClient) {
  }

  addYearLevelMapping(yearLevel: YearLevelMapping) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/year-level-mappings';

    return this.http.put<YearLevelMapping>(requestUrl, JSON.parse(JSON.stringify(yearLevel)), this.settings.httpOptionWithToken());
  }

  updateYearLevelMapping(id: number, newYearLevelMapping: YearLevelMapping) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/year-level-mappings/' + id;

    return this.http.patch<YearLevelMapping>(requestUrl, JSON.parse(JSON.stringify(newYearLevelMapping)), this.settings.httpOptionWithToken());
  }

  getYearLevelMappings(schoolLocationId?: number): Observable<YearLevelMapping> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/year-level-mappings' + (schoolLocationId ? `?school_location_id=${schoolLocationId}` : '');

    return this.http.get<YearLevelMapping>(requestUrl, this.settings.httpOptionWithToken());
  }

  getYearLevelMapping(id: number) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/year-level-mappings/' + id;

    return this.http.get<YearLevelMapping>(requestUrl, this.settings.httpOptionWithToken());
  }

  getYearLevelMappingBySchoolLevel(schoolLevel: number, schoolLevelLocation: number) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/year-level-mappings/' + schoolLevel + '/' + schoolLevelLocation;

    return this.http.get<YearLevelMapping>(requestUrl, this.settings.httpOptionWithToken());
  }

  getFilteredYearLevelMapping(param: Object): Observable<YearLevelMapping> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/year-level-mappings/filtered';

    return this.http.post<YearLevelMapping>(requestUrl, param, this.settings.httpOptionWithToken());
  }

  deleteYearLevelMapping(id: number) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/year-level-mappings/' + id;

    return this.http.delete<YearLevelMapping>(requestUrl, this.settings.httpOptionWithToken());
  }

  filteredRoles(param: Object): Observable<YearLevelMapping> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/year-level-mappings/filtered-roles';

    return this.http.post<YearLevelMapping>(requestUrl, param, this.settings.httpOptionWithToken());
  }

  filteredRolesV2(param: Object): Observable<YearLevelMapping> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/year-level-mappings/filtered-roles-v2';

    return this.http.post<YearLevelMapping>(requestUrl, param, this.settings.httpOptionWithToken());
  }

  checkYearLevelMapping(param: any) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/year-level-mappings/check';

    return this.http.post<YearLevelMapping>(requestUrl, param, this.settings.httpOptionWithToken());
  }
}
