import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { PathwayMapping } from '../models/pathway-mapping.model';
import {SettingService} from "./setting.service";

@Injectable()
export class PathwayMappingService {

  pathwayMappingChanged = new Subject<PathwayMapping[]>();

  constructor(private settings: SettingService,
              private http: HttpClient) {
  }

  addPathwayMapping(pathwayMapping: any) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/pathway-mappings/with-school-level-relation';

    return this.http.post<PathwayMapping>(requestUrl, JSON.parse(JSON.stringify(pathwayMapping)), this.settings.httpOptionWithToken());
  }

  getPathwayMappings(): Observable<PathwayMapping> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/pathway-mappings';

    return this.http.get<PathwayMapping>(requestUrl, this.settings.httpOptionWithToken());
  }

  getPathwayMapping(id: number) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/pathway-mappings/' + id;

    return this.http.get<PathwayMapping>(requestUrl, this.settings.httpOptionWithToken());
  }

  getPathwayMappingBySchoolLevelRelation(id: number) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/pathway-mappings/with-school-level-relation/' + id;

    return this.http.get<PathwayMapping>(requestUrl, this.settings.httpOptionWithToken());
  }

  getFilteredPathwayMapping(param: Object): Observable<PathwayMapping> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/pathway-mappings/filtered';

    return this.http.post<PathwayMapping>(requestUrl, param, this.settings.httpOptionWithToken());
  }

  deletePathwayMapping(id: number) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/pathway-mappings/' + id;

    return this.http.delete<PathwayMapping>(requestUrl, this.settings.httpOptionWithToken());
  }

  filteredRoles(param: Object): Observable<PathwayMapping> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/pathway-mappings/filtered-roles';
    return this.http.post<PathwayMapping>(requestUrl, param, this.settings.httpOptionWithToken());
  }
  filteredRolesV2(param: Object): Observable<PathwayMapping> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/pathway-mappings/filtered-roles-v2';
    return this.http.post<PathwayMapping>(requestUrl, param, this.settings.httpOptionWithToken());
  }

  getHomeroomTeacherPathwayMappings(staff_id: number) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/pathway-mappings/homeroom-teacher/' + staff_id;

    return this.http.get(requestUrl, this.settings.httpOptionWithToken());
  }

  checkPathwayMapping(param: any) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/pathway-mappings/check';
    return this.http.post<PathwayMapping>(requestUrl, param, this.settings.httpOptionWithToken());
  }
}
