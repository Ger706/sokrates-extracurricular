import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { SettingService } from './setting.service';
import { ClassModel } from '../models/class.model';

@Injectable()
export class ClassService {
  classChanged = new Subject<ClassModel[]>();

  constructor(private settings: SettingService,
              private http: HttpClient) {
  }

  getClass(id: number): Observable<ClassModel> {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/classes/${id}`;
    console.log(requestUrl);
    return this.http.get<ClassModel>(requestUrl, this.settings.httpOptionWithToken());
  }

  getClasses(): Observable<ClassModel[]> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/classes';

    return this.http.get<ClassModel[]>(requestUrl, this.settings.httpOptionWithToken());
  }

  getFilteredClass(param: Object): Observable<ClassModel[]> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/classes/filtered';

    return this.http.post<ClassModel[]>(requestUrl, param, this.settings.httpOptionWithToken());
  }

  getCurrentFilteredClass(param: Object): Observable<ClassModel[]> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/classes/current-filtered';

    return this.http.post<ClassModel[]>(requestUrl, param, this.settings.httpOptionWithToken());
  }

  filteredRoles(param: Object): Observable<ClassModel[]> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/classes/filtered-roles';

    return this.http.post<ClassModel[]>(requestUrl, param, this.settings.httpOptionWithToken());
  }

  getClassMembers(id: number): Observable<ClassModel> {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/classes/${id}/members`;

    return this.http.get<ClassModel>(requestUrl, this.settings.httpOptionWithToken());
  }

  getHomeroomTeacherClass(param: Object): Observable<any> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/classes/by-homeroom-teacher';

    return this.http.post<any>(requestUrl, param, this.settings.httpOptionWithToken());
  }

  getMembersFromManyClasses(param: any) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/classes/members';

    return this.http.post<any>(requestUrl, param, this.settings.httpOptionWithToken());
  }

  getSpecialClassMembers(param: any): Observable<ClassModel> {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/classes/special-members`;

    return this.http.post<any>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }

  generateClasses(param: any) {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/classes/generate`;

    return this.http.post<any>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }

  classMigration(data: any) {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/classes/migration`;

    return this.http.post<any>(requestUrl, data, this.settings.httpOptionWithToken());
  }

  allocateClass(param: any) {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/classes/allocate`;

    return this.http.post<any>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }

  updateClass(id: number, param: any) {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/classes/${id}`;

    return this.http.patch<any>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }

  deleteClass(periodId: number, id: number, pairingKey: string): Observable<ClassModel> {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/classes/${periodId}/${id}/${pairingKey}`;

    return this.http.delete<any>(requestUrl, this.settings.httpOptionWithToken());
  }

  copyClass(param: any) {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/classes/copy`;

    return this.http.post<any>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }

  getClassMonthlyAttendance(id: number, month: string, isMonthly: boolean): Observable<any> {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/classes/${id}/attendances/months/` + month + `/is-monthly/${isMonthly}`;
    return this.http.get<any>(requestUrl, this.settings.httpOptionWithToken());
  }

  getAttendanceByStudent(id: number, studentId: number): any {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/classes/${id}/attendances/student/` + studentId;
    return this.http.get<any>(requestUrl, this.settings.httpOptionWithToken());
  }


  getStudentsOfParentViewAttendance(id: number, studentId: number) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/classes/' + id + '/attendances/get-students-of-parent-view-attendance/' + studentId;
    return this.http.get<any>(requestUrl, this.settings.httpOptionWithToken());
  }

  getFilteredClassByTeacherSubject(param: any) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/scoring/student-daily-observation/get-filtered-class-by-teacher-subject';
    return this.http.post<any>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }

  getFilteredTeacherByClass(param: object) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/scoring/student-daily-observation/get-filtered-teacher-by-class';
    return this.http.post<any>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }

  deleteClassDailyAttendance(id: number, param: any) {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/classes/${id}/attendances/daily/` + param.date + '/delete';
    return this.http.post<any>(requestUrl, param, this.settings.httpOptionWithToken());
  }

  resetClassDailyAttendance(id: number, param: any) {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/classes/${id}/attendances/daily/` + param.date + `/reset`;

    return this.http.post<any>(requestUrl, param, this.settings.httpOptionWithToken());
  }

  getClassTeacherSubject(academicYear: string, periodId: number, staffId: number) {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/classes/teacher-subject/${academicYear}/${periodId}/${staffId}`;
    return this.http.get<any>(requestUrl, this.settings.httpOptionWithToken());
  }

  getPreviousClass(param: any) {
    const requestUrl = this.settings.getConfig('client.url') + `/customer/classes/previous`;

    return this.http.post<any>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }
}
