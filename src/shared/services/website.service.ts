import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

import {Website} from '../models/website.model';
import {SettingService} from './setting.service';
import {LocalStorageService} from "./localstorage.service";
import {WINDOW} from "../providers/window.provider";

@Injectable()
export class WebsiteService {

  private website: Website | null = null;
  private websiteSelected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private windowLocation;

  constructor(private http: HttpClient,
              private router: Router,
              private settings: SettingService,
              private localStorage: LocalStorageService,
              @Inject(WINDOW) private window: Window
  ) {
    this.windowLocation = this.window.location.hostname;
  }

  get isSelected() {
    if (this.settings.getConfig('client.url') !== null) {
      return true;
    }

    return false;
  }

  select(website: any) {
    let fqdn = website.fqdn;
    if (fqdn.includes('sokrates.xyz')) {
      fqdn += ':4430';
    }

    if (fqdn !== '') {
      this.settings.setClientUrl(fqdn, website.force_https);
      this.settings.setClientHostname(website.fqdn);
      this.settings.setCustomerId(website.customer_id);
      this.settings.setWebSettings(JSON.stringify(website.settings.sokrates));
      return true;
    }

    return false;
  }

  unselect() {
    // @ts-ignore
    this.settings.setConfig('client.url', null);
    this.websiteSelected.next(false);
    this.router.navigate(['/system/server-select']);
  }

  lookup(fqdn: string): Observable<any> {
    // const url = this.settings.getConfig('system.url') + '/system/hostname/check/' + fqdn;

    const url = this.settings.getConfig('api.url') + '/tenant-http/v1/system/hostname/check/' + fqdn;

    // const url = 'http://localhost:3000/tenant-http/v1/system/hostname/check/' + fqdn;

    return this.http.get<Website>(url)
      .pipe(
        this.localStorage.localStorageCacheHttp(url)
      );
  }

  lookupRegisteredDomain(hostname: string | null): Observable<any> {
    hostname = hostname ? hostname : this.windowLocation;
    // const url = this.settings.getConfig('system.url') + '/system/hostname/lookup/' + hostname;
    const url = this.settings.getConfig('api.url') + '/tenant-http/v1/system/hostnames/lookup/' + hostname;
    // const url = 'http://localhost:3063/tenant-http/v1/system/hostnames/lookup/' + hostname;

    return this.http.get<Website>(url)
      .pipe(
        this.localStorage.localStorageCacheHttp(url)
      );
  }

  checkActiveTenant(customerId: number): Observable<any> {
    // const url = this.settings.getConfig('system.url') + '/system/hostname/check-active/' + customerId;
    const url = this.settings.getConfig('api.url') + '/tenant-http/v1/system/hostname/check-active/' + customerId;
    // const url = 'http://localhost:3000/tenant-http/v1/system/hostname/check-active/' + customerId;

    return this.http.get<Website>(url)
      .pipe(
        this.localStorage.localStorageCacheHttp(url)
      );
  }

}
