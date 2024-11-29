import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {School} from "../models/school.model";
import {SettingService} from "./setting.service";
import {SchoolLocation} from "../models/school-location";


@Injectable()
export class SchoolAndLocationService {
  schoolChanged = new Subject<School[]>();

  constructor(private settings: SettingService,
              private http: HttpClient) {
  }

  getSchools(): Observable<School> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/schools';

    return this.http.get<School>(requestUrl, this.settings.httpOptionWithToken());
  }

  getSchool(id: number): Observable<School> {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/schools/${id}`;

    return this.http.get<School>(requestUrl, this.settings.httpOptionWithToken());
  }

  createSchool(data: any): Observable<School> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/schools';

    return this.http.put<School>(requestUrl, data, this.settings.httpOptionWithToken());
  }

  updateSchool(id: number, data: any): Observable<School> {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/schools/${id}`;

    return this.http.patch<School>(requestUrl, data, this.settings.httpOptionWithToken());
  }

  getSchoolLocationFromForClassAllocation(year_level_order_number: number): Observable<School> {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/schools/class/${year_level_order_number}`;

    return this.http.get<School>(requestUrl, this.settings.httpOptionWithToken());
  }


  getSchoolLocation(school_id: number, page: number) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/schools/' + school_id + '/locations?page=' + page;

    return this.http.get<SchoolLocation>(requestUrl, this.settings.httpOptionWithToken());
  }

  getSchoolLocations() {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/schools/locations';
    return this.http.get<SchoolLocation>(requestUrl, this.settings.httpOptionWithToken());
  }

  getFilteredSchoolLocation(params: any): Observable<any> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/schools/filtered-locations';
    return this.http.post<SchoolLocation>(requestUrl, params, this.settings.httpOptionWithToken());
  }
  getFilteredSchoolLocationV2(params: any): Observable<any> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/schools/filtered-locations-v2';
    return this.http.post<SchoolLocation>(requestUrl, params, this.settings.httpOptionWithToken());
  }

  deleteSchoolLocation(schoolId: number, schoolLocationId: number): Observable<SchoolLocation> {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/schools/${schoolId}/locations/${schoolLocationId}`;

    return this.http.delete<SchoolLocation>(requestUrl, this.settings.httpOptionWithToken());
  }
}
