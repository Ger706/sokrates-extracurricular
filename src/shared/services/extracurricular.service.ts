import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Schoolday } from '../models/schoolday.model';
import { ExtracurricularParticipant } from '../models/extracurricular-participant.model';
import {SettingService} from "./setting.service";
import {Extracurricular} from "../models/extracurricular.model";
import {ClassModel} from "../models/class.model";

@Injectable()
export class ExtracurricularService {
    exculCoachChanged = new Subject<Extracurricular[]>();

    constructor(private settings: SettingService,
                private http: HttpClient) {
    }

    getSchoolDays(): Observable<Schoolday> {
        const requestUrl = this.settings.getConfig('client.url') + '/customer' + '/schooldays';

        return this.http.get<Schoolday>(requestUrl, this.settings.httpOptionWithToken());
    }

    getFilteredExcul(param: Object): Observable<Extracurricular[]> {
        const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/excul/filtered';

        return this.http.post<Extracurricular[]>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
    }

    getAllFilteredExcul(param: Object): Observable<Extracurricular[]> {
        const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/excul/filtered-all';

        return this.http.post<Extracurricular[]>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
    }

    getAllDropdownExcul(param: Object): Observable<Extracurricular[]> {
        const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/excul/dropdown-all';

        return this.http.post<Extracurricular[]>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
    }

    getAllExculForMapping(param: Object): Observable<Extracurricular[]> {
        const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/excul/filtered-mapping';

        return this.http.post<Extracurricular[]>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
    }

    getFilteredExculParticipant(param: Object): Observable<Extracurricular[]> {
        const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/excul/filtered-participant';

        return this.http.post<Extracurricular[]>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
    }

    getTotalExculCategory(param: Object): Observable<Extracurricular[]> {
        const requestUrl =  this.settings.getConfig('client.url') + '/customer/extracurricular/category/get-excul-total';

        return this.http.post<Extracurricular[]>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
    }
    getAttendanceSummary(param: Object): Observable<Extracurricular[]> {
        const requestUrl =  this.settings.getConfig('client.url') + '/customer/extracurricular/excul/get-attendance-summary';

        return this.http.post<Extracurricular[]>(requestUrl, JSON.parse(JSON.stringify(param)), this.settings.httpOptionWithToken());
    }

    addExcul(excul: Extracurricular) {
        const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/excul';

        return this.http.put<Extracurricular>(requestUrl,
            JSON.parse(JSON.stringify(excul)),
            this.settings.httpOptionWithToken());
    }

    uploadExcul(excul: any) {
        const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/excul/upload';

        return this.http.post<Extracurricular>(requestUrl,
            JSON.parse(JSON.stringify(excul)),
            this.settings.httpOptionWithToken());
    }

    updateExculStatus(id: number, newExcul: any) {
        const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/excul/' + id;

        return this.http.patch<Extracurricular>(requestUrl,
            JSON.parse(JSON.stringify(newExcul)),
            this.settings.httpOptionWithToken());
    }

    updateExcul(id: number, newExcul: Extracurricular) {
        const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/excul/' + id;

        return this.http.patch<Extracurricular>(requestUrl,
            JSON.parse(JSON.stringify(newExcul)),
            this.settings.httpOptionWithToken());
    }

    getExcul(id: number) {
        const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/excul/' + id;

        return this.http.get<Extracurricular>(requestUrl, this.settings.httpOptionWithToken());
    }

    deleteExcul(id: number) {
        const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/excul/' + id;

        return this.http.delete<Extracurricular>(requestUrl, this.settings.httpOptionWithToken());
    }

    addParticipant(id: number, data: any) {
        const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/excul/' + id + '/participant';

        return this.http.put<ExtracurricularParticipant>(requestUrl,
            JSON.parse(JSON.stringify(data)),
            this.settings.httpOptionWithToken());
    }

    getParticipant(id: number) {
        const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/excul/' + id + '/participant';

        return this.http.get<ExtracurricularParticipant>(requestUrl, this.settings.httpOptionWithToken());
    }

    getFilteredParticipant(id: number, params: any) {
        const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/excul/' + id + '/participant/filtered';

        return this.http.post<ExtracurricularParticipant>(requestUrl, JSON.parse(JSON.stringify(params)), this.settings.httpOptionWithToken());
    }

    deleteParticipant(exculId: number, participantId: number) {
        const requestUrl =
            this.settings.getConfig('client.url') + '/customer/extracurricular/excul/' + exculId + '/participant/' + participantId;

        return this.http.delete<ExtracurricularParticipant>(requestUrl, this.settings.httpOptionWithToken());
    }

    deleteBulkParticipant(exculId: number, params: any) {
        const requestUrl =
            this.settings.getConfig('client.url') + '/customer/extracurricular/excul/' + exculId + '/participant/delete-bulk';

        return this.http.post<ExtracurricularParticipant>(requestUrl, JSON.parse(JSON.stringify(params)), this.settings.httpOptionWithToken());
    }

    getClassListByExculId(id: number) {
        const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/excul/' + id + '/classes';

        return this.http.post<ClassModel>(requestUrl, null, this.settings.httpOptionWithToken());
    }

    addExtracurricularFromExisting(data: any) {
        const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/excul/add-existing';

        return this.http.post<any>(requestUrl, data, this.settings.httpOptionWithToken());
    }

    approveParticipant(exculId: number, data: { excul_registration_id: number[] }) {
        const requestUrl =
            this.settings.getConfig('client.url') + '/customer/extracurricular/excul/' + exculId + '/participant/approve';

        return this.http.post<any>(requestUrl, data, this.settings.httpOptionWithToken());
    }

    getExculApprover(data: {
        school_location_id: number,
    }) {
        const requestUrl = this.settings.getConfig('client.url') + '/customer/extracurricular/excul/approver';

        return this.http.post<any>(requestUrl, data, this.settings.httpOptionWithToken());
    }
}
