import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
// import {MicroserviceModel} from '../models/microservice.model';
import {LocalStorageService} from './localstorage.service';
import {Observable} from 'rxjs';

@Injectable()
export class SettingService {
    config: any;

    constructor(
        private localStorage: LocalStorageService,
        private http: HttpClient,
    ) {
        this.initConfig();
    }

    setUrl(url: string, secure: boolean = false): string {
        const protocol = secure ? 'https://' : 'http://';

        return protocol + url;
    }

    setApiUrl(url: string, secure: boolean = false) {
        this.setConfig('api.url', this.setUrl(url, secure));
        this.setConfig('api.secure', secure ? 'true' : 'false');
        this.setConfig('api.hostname', url);
    }

    getApiUrl(service: string, url: string) {
        return `${this.getConfig('api.url')}/${service}${url}`;
    }

    setSystemUrl(url: string, secure: boolean = false) {
        this.setConfig('system.url', this.setUrl(url, secure));
        this.setConfig('system.secure', secure ? 'true' : 'false');
        this.setConfig('system.hostname', url);
    }

    setAuthUrl(url: string, secure: boolean = false) {
        this.setConfig('auth.url', this.setUrl(url, secure));
        this.setConfig('auth.secure', secure ? 'true' : 'false');
        this.setConfig('auth.hostname', url);
    }

    setClientUrl(url: string, secure: boolean = false) {
        this.setConfig('client.url', this.setUrl(url, secure));
        this.setConfig('client.secure', secure ? 'true' : 'false');
    }

    setClientHostname(hostname: string) {
        this.setConfig('client.hostname', hostname);
    }

    setUploadUrl(url: string, secure: boolean = false) {
        this.setConfig('upload.url', this.setUrl(url, secure));
        this.setConfig('upload.secure', secure ? 'true' : 'false');
        this.setConfig('upload.hostname', url);
    }

    getUploadUrl(product: string, url: string) {
        return `${this.getConfig('upload.url')}/${product}${url}`;
    }

    setExportUrl(url: string, secure: boolean = false) {
        this.setConfig('export.url', this.setUrl(url, secure));
        this.setConfig('export.secure', secure ? 'true' : 'false');
        this.setConfig('export.hostname', url);
    }

    setStorageUrl(url: string) {
        this.setConfig('storage.url', url);
    }

    setCustomerId(customerId: number) {
        this.setConfig('system.id', customerId.toString());
    }

    getCustomerId(): number {
        return Number(this.getConfig('system.id'));
    }

    setWebSettings(settings: any) {
        this.setConfig('client.webSettings', settings);
    }

    setHasProduct(hasProduct: any) {
        this.setConfig('client.has_product', hasProduct);
    }

    setMicroservices(microservices: any) {
        this.setConfig('client.microservices', microservices);
    }

    getStorageUrl() {
        return this.getConfig('storage.url');
    }

    getWebSettings() {
        return JSON.parse(<string>this.getConfig('client.webSettings'));
    }

    getHasProduct() {
        return JSON.parse(<string>this.getConfig('client.has_product'));
    }

    getMicroservices(): any {
        return JSON.parse(<string>this.getConfig('client.microservices')) as Object;
    }

    // getMicroservice(key: string): MicroserviceModel {
    //     const microservices = this.getMicroservices();
    //
    //     if (!microservices) {
    //         return null;
    //     }
    //
    //     if (!microservices.hasOwnProperty(key)) {
    //         return null;
    //     }
    //
    //     return microservices[key];
    // }

    setConfig(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    unsetConfig(key: string) {
        localStorage.removeItem(key);
    }

    getConfig(key: string) {
        if (key == 'client.url') {
            return 'https://kalam-kudus.api.sokrates.xyz:4430'
        }
        return localStorage.getItem(key);
    }

    getStaffId() {
        const auth = JSON.parse(<string>this.getConfig('client.auth'));

        return auth.user.staff_id || null;
    }

    setToken(token: string) {
        this.setConfig('client.token', token);
    }

    getToken() {
        const clientoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2thbGFtLWt1ZHVzLmFwaS5zb2tyYXRlcy54eXo6NDQzMCIsImlhdCI6MTczMjc2ODYxMywiZXhwIjoxNzMzOTg1NDEzLCJuYmYiOjE3MzI3Njg2MTMsImp0aSI6ImY1MDRmODJhNjZkOTRlZTE5MzNiMWJhOGY0YTMzNjdmIiwic3ViIjoxLCJwcnYiOiJkZDM4MTJhMWQwNDE2NWRhODBiNmNiMGY2MWUxZDc4NzgyZGJkYzM2IiwidXVpZCI6IjFiOTBiYTBjLTExMzAtNDU0Ni05Mjg4LTlhNDQ4NmNmMDdiZSIsInRlbmFudF91dWlkIjoiMWI5MGJhMGMtMTEzMC00NTQ2LTkyODgtOWE0NDg2Y2YwN2JlIiwidXNlcl91dWlkIjoiMmRiNDgwYjMtNTQ1OC00MmYwLThhMmUtODc3YzM3Yjg4OTIzIn0.syN7yOJtelw5j4c7x9L28aMpEYJCL9AjP-tuiCFNX-k'
        return clientoken;
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2thbGFtLWt1ZHVzLmFwaS5zb2tyYXRlcy54eXo6NDQzMCIsImlhdCI6MTczMjc3NDk4NiwiZXhwIjoyNzMyNzgyMTg2LCJuYmYiOjE3MzI3NzQ5ODYsImp0aSI6IjI3ZmJiYzczNDE2OTQ2NTk4MGJlNzQzNGNkYWJjODZiIiwic3ViIjoxLCJwcnYiOiJkZDM4MTJhMWQwNDE2NWRhODBiNmNiMGY2MWUxZDc4NzgyZGJkYzM2IiwidXVpZCI6IjFiOTBiYTBjLTExMzAtNDU0Ni05Mjg4LTlhNDQ4NmNmMDdiZSIsInRlbmFudF91dWlkIjoiMWI5MGJhMGMtMTEzMC00NTQ2LTkyODgtOWE0NDg2Y2YwN2JlIiwidXNlcl91dWlkIjoiMmRiNDgwYjMtNTQ1OC00MmYwLThhMmUtODc3YzM3Yjg4OTIzIn0.IY24zmnrmbK6k2Lm3nJNnREhYus87bK54oLVJ4A0keM
    }

    resetAll() {
        localStorage.clear();
        this.localStorage.clear();
        this.initConfig();
    }

    initConfig() {
        this.config = environment;

        this.setApiUrl(this.config.api.url, this.config.api.secure);
        this.setSystemUrl(this.config.system.url, this.config.system.secure);
        this.setAuthUrl(this.config.auth.url, this.config.auth.secure);
        this.setStorageUrl(this.config.storage.url);
        this.setDashboardUrl(this.config.dashboard.url, this.config.dashboard.secure);
        this.setAccurate(this.config.accurate.client_id, this.config.accurate.encoded_client_id_secret);
        this.setUploadUrl(this.config.upload.url, this.config.upload.secure);
        this.setExportUrl(this.config.export.url, this.config.export.secure);
    }

    httpOptionWithToken(param?: HttpParams) {
        return {
            headers: new HttpHeaders({
                // 'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + this.getToken()
            }),
            params: param,
        };
    }

    // getSelectDirectiveConfigName(comp: any): string | null {
    //     const camel = (x: string) => {
    //         return x.replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr: string, idx: number) => {
    //             return idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase();
    //         }).replace(/\s+/g, '');
    //     };
    //
    //     if ((comp.injector as any).view.component) {
    //         const proto = Object.getPrototypeOf((comp.injector as any).view.component);
    //         if (proto) {
    //             return `client.${camel(proto.constructor.name)}.${camel(comp.constructor.name)}`;
    //         }
    //     }
    //
    //     return null;
    // }

    // setManifest() {
    //     document.getElementById('manifest').setAttribute('href', `${this.getConfig('client.url')}/manifest.json`);
    // }

    setDashboardUrl(url: string, secure: boolean = false) {
        this.setConfig('dashboard.url', this.setUrl(url, secure));
    }

    setAccurate(client_id: string, encoded_client_id_secret: string) {
        this.setConfig('accurate.client_id', client_id);
        this.setConfig('accurate.encoded_client_id_secret', encoded_client_id_secret);
    }

    getDashboardUrl() {
        return this.getConfig('dashboard.url');
    }

    // getEnvironmentValue(path: string) {
    //   const obj = environments;
    //   const getDescendantProp = (obj, path) => (
    //     path.split('.').reduce((acc, part) => acc && acc[part], obj)
    //   );

    //   return getDescendantProp;
    // }

    // getDescendantProp(obj, desc) {
    //   var arr = desc.split('.');
    //   while (arr.length && (obj = obj[arr.shift()]));
    //   return obj;
    // }

    setTokenNext(token: string ) {
        this.setConfig('client.token_next', token);
    }

    getTokenNext() {
        return this.getConfig('client.token_next');
    }

    setUrlNext(url: string ) {
        this.setConfig('client.url_next', url);
    }

    getUrlNext() {
        return this.getConfig('client.url_next');
    }

    menuCheck(task: string): Observable<any> {
        const requestUrl = this.getApiUrl('admin-http', `/api/v1/menu/${task}`);
        return this.http.get<any>(requestUrl, {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + this.getTokenNext()
            })
        });
    }
}
