import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {SettingService} from '../../shared/services/setting.service';
import {WebsiteService} from '../../shared/services/website.service';
import { UserService } from '../../shared/services/user.service';
import {environment} from "../../environments/environment";
import {LocalStorageService} from "../../shared/services/localstorage.service";
import {Auth} from "../../shared/models/auth.model";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loading = true;
  errorMsg = null;

  // currentApplicationVersion = environment.appVersion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private websiteService: WebsiteService,
    private authService: AuthService,
    private settingService: SettingService,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.initToken(this.route.snapshot.queryParams['token']);

    const data = {
      session_id: this.settingService.getSessionId(),
      action: 'renew'
    };
    this.authService.renewDeleteSession(data).subscribe(
        (response: Auth) => {
          // @ts-ignore
          if (response['error'] === 0) {
            window.location.href = '/layout/home'
          }
        },
        error => {

        }
    );
  }

  initToken(token: string): void {
    if (!token) {
      this.loading = false;
      this.errorMsg = null;
      return;
    }

    this.settingService.setToken(token);

  //   this.websiteService.lookupTenantHostname()
  //     .subscribe(res => {
  //       if (res.error === 0) {
  //         // do login
  //         const website = res.result.data;
  //         this.websiteService.select(website);
  //
  //         this.authService.loginByToken()
  //           .subscribe(res2 => {
  //             if (res2.error === 0) {
  //               // Get Timezone
  //               this.userService.getTimezone(token)
  //                 .subscribe(res3 => {
  //                   if (res3.error === 0) {
  //                     const timezone = res3?.result?.data?.timezone || 'Etc/GMT-7';
  //                     this.settingService.setConfig('timezone', timezone);
  //                   } else {
  //                     this.settingService.setConfig('timezone', 'Etc/GMT-7');
  //                   }
  //                   this.authService.loginSelect(res2.result.data, token);
  //                   this.authService.setPermissions(res2.result.data, true, true);
  //                 }, err => {
  //                   this.settingService.setConfig('timezone', 'Etc/GMT-7');
  //                   this.authService.loginSelect(res2.result.data, token);
  //                   this.authService.setPermissions(res2.result.data, true, true);
  //                 });
  //               // this.authService.loginSelect(res2.result.data, token);
  //               // this.authService.setPermissions(res2.result.data, true, true);
  //             } else {
  //               this.errorMsg = 'Token error';
  //               this.loading = false;
  //               this.settingService.resetAll();
  //               window.location.href = '/auth';
  //             }
  //           }, err => {
  //             this.errorMsg = 'Token error';
  //             this.loading = false;
  //             this.settingService.resetAll();
  //             window.location.href = '/auth';
  //           });
  //
  //       } else {
  //         this.errorMsg = 'Token error';
  //         this.loading = false;
  //       }
  //     }, err => {
  //       console.log(err);
  //       this.loading = false;
  //       this.errorMsg = 'Token error';
  //     });
  }
}
