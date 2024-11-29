import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {SettingService} from './setting.service';
import {AcademicYear} from '../models/academic-year.model';
import {AcademicCalendar} from '../models/academic-calendar.model';
import {Schoolday} from '../models/schoolday.model';
import {MonthModel} from '../models/month.model';
import {LocalStorageService} from "./localstorage.service";

@Injectable()
export class AcademicCalendarService {
  academicCalendarChanged = new Subject<AcademicCalendar[]>();

  constructor(
    private settings: SettingService,
    private localStorage: LocalStorageService,
    private http: HttpClient
  ) {
  }

  getAcademicYearsOnly(param: any) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/academic-calendars/academic-years/only';

    return this.http.post(requestUrl, param, this.settings.httpOptionWithToken());
  }

  getAcademicYearsOnlyCurrent(): Observable<AcademicYear> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/academic-calendars/academic-years/current-only';

    return this.http.get<AcademicYear>(requestUrl, this.settings.httpOptionWithToken());
  }

  getAcademicYears(): Observable<AcademicYear> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/academic-calendars/academic-years';

    return this.http.get<AcademicYear>(requestUrl, this.settings.httpOptionWithToken());
  }

    // GET ACADEMIC YEAR KHUSUS ADMISSION
    getAdmissionAcademicYears(params: any = null, real: boolean = false): Observable<any> {
      const requestUrl = this.settings.getApiUrl('admission-http', `/v1/academic/select-academic-year`);
      return this.http.get<any>(requestUrl, this.settings.httpOptionWithToken(params));
    }

  getCurrentAcademicYear(): Observable<any> {
    const url = this.settings.getConfig('client.url') + '/customer/academic-calendars/academic-years/current';

    return this.http.get<any>(url, this.settings.httpOptionWithToken())
      .pipe(
        this.localStorage.localStorageCacheHttp(url)
      );
  }

  addAcademicCalendar(academicCalendar: AcademicCalendar) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/academic-calendars';

    return this.http.put<AcademicCalendar>(requestUrl, JSON.parse(JSON.stringify(academicCalendar)), this.settings.httpOptionWithToken());
  }

  addAcademicCalendarBackground(academicCalendar: AcademicCalendar) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/academic-calendars/background';

    return this.http.put<AcademicCalendar>(requestUrl, JSON.parse(JSON.stringify(academicCalendar)), this.settings.httpOptionWithToken());
  }

  updateAcademicCalendar(id: any, academicCalendar: AcademicCalendar) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/academic-calendars/' + id;

    return this.http.patch<AcademicCalendar>(requestUrl, JSON.parse(JSON.stringify(academicCalendar)), this.settings.httpOptionWithToken());
  }

  getAcademicCalendars(): Observable<AcademicCalendar> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/academic-calendars';

    return this.http.get<AcademicCalendar>(requestUrl, this.settings.httpOptionWithToken());
  }

  getAcademicCalendar(id: number): Observable<AcademicCalendar> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/academic-calendars/' + id;

    return this.http.get<AcademicCalendar>(requestUrl, this.settings.httpOptionWithToken());
  }

  getFilteredAcademicCalendar(param: Object): Observable<AcademicCalendar> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/academic-calendars/filtered';

    return this.http.post<AcademicCalendar>(requestUrl, param, this.settings.httpOptionWithToken());
  }

  deleteAcademicCalendar(id: number) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/academic-calendars/' + id;

    return this.http.delete<AcademicCalendar>(requestUrl, this.settings.httpOptionWithToken());
  }

  getSchooldays(): Observable<Schoolday> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/schooldays';

    return this.http.get<Schoolday>(requestUrl, this.settings.httpOptionWithToken());
  }

  getMonthList(id: number): Observable<MonthModel> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/academic-calendars/' + id + '/months';

    return this.http.get<MonthModel>(requestUrl, this.settings.httpOptionWithToken());
  }

  getSchoolDays(id: number): Observable<any> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/academic-calendars/' + id + '/school-days';

    return this.http.get<any>(requestUrl, this.settings.httpOptionWithToken());
  }

  validatePreviousAcademicCalendar(param: Object): Observable<any> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/academic-calendars/validate';

    return this.http.post<any>(requestUrl, param, this.settings.httpOptionWithToken());
  }

  editMultipleEvent(param: any): Observable<any> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/academic-calendars/edit-multiple';

    return this.http.patch<any>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }

  uploadMultipleEvent(param: any): Observable<any> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/academic-calendars/upload-multiple';

    return this.http.post<any>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }

  checkAcademicCalendar(param: any) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/academic-calendars/check';

    return this.http.post<any>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }
}
