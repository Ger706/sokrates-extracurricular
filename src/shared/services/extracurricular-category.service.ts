import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {ExtracurricularCategory} from "../models/extracurricular-category.model";
import {SettingService} from "./setting.service";


@Injectable()
export class ExtracurricularCategoryService {
  exculCategoryChanged = new Subject<ExtracurricularCategory[]>();

  constructor(private settings: SettingService,
              private http: HttpClient) {
  }

  addCategory(exculCategory: ExtracurricularCategory) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/category';

    return this.http.put<ExtracurricularCategory>(requestUrl,
      JSON.parse(JSON.stringify(exculCategory)),
      this.settings.httpOptionWithToken());
  }

  updateCategory(id: number, newCategory: ExtracurricularCategory) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/category/' + id;

    return this.http.patch<ExtracurricularCategory>(requestUrl,
      JSON.parse(JSON.stringify(newCategory)),
      this.settings.httpOptionWithToken());
  }

  getCategories(page: number): Observable<ExtracurricularCategory> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer' + '/extracurricular/category?page=' + page;

    return this.http.get<ExtracurricularCategory>(requestUrl, this.settings.httpOptionWithToken());
  }

  getFilteredCategory(param: Object): Observable<ExtracurricularCategory> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer' + '/extracurricular/category/filtered';

    return this.http.post<ExtracurricularCategory>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
  }

  getActiveCategories(): Observable<ExtracurricularCategory> {
    const requestUrl = this.settings.getConfig('client.url') + '/customer' + '/extracurricular/category/active';

    return this.http.get<ExtracurricularCategory>(requestUrl, this.settings.httpOptionWithToken());
  }

  getCategory(id: number) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/category/' + id;

    return this.http.get<ExtracurricularCategory>(requestUrl, this.settings.httpOptionWithToken());
  }

  deleteCategory(id: number) {
    const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/category/' + id;

    return this.http.delete<ExtracurricularCategory>(requestUrl, this.settings.httpOptionWithToken());
  }
}
