import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {buffer, debounceTime, filter, Observable} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Auth} from "../../../shared/models/auth.model";
import {AuthService} from "../../../shared/services/auth.service";
import {User} from "../../../shared/models/user.model";
import {ActivationEnd, NavigationEnd, Route, Router} from "@angular/router";
import {IdleService} from "../../../shared/services/idle-service";
import {TranslateService} from "../../../shared/services/translate.service";
import {SettingService} from "../../../shared/services/setting.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}
declare let gtag: Function;
@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  search: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
      private breakpointObserver: BreakpointObserver,
      private auth: AuthService,
      private translate: TranslateService,
      public authService: AuthService,
      private settingService: SettingService,
      private router: Router,
      private toastr: ToastrService
    ) { }

  routerActive: string = "activelink";
  currentUser : User | null = null;
  sidebarMenu: sidebarMenu[] = [
    {
      link: "/layout/home",
      icon: "home",
      menu: "Dashboard",
    },
    {
      link: "/layout/school-activities",
      icon: "disc",
      menu: "School Activities",
    },
    {
      link: "/layout/rules",
      icon: "layout",
      menu: "Rules",
    },
    {
      link: "/alerts",
      icon: "info",
      menu: "Alerts",
    },
    {
      link: "/grid-list",
      icon: "file-text",
      menu: "Grid List",
    },
    {
      link: "/menu",
      icon: "menu",
      menu: "Menus",
    },
    {
      link: "/table",
      icon: "grid",
      menu: "Tables",
    },
    {
      link: "/expansion",
      icon: "divide-circle",
      menu: "Expansion Panel",
    },
    {
      link: "/chips",
      icon: "award",
      menu: "Chips",
    },
    {
      link: "/tabs",
      icon: "list",
      menu: "Tabs",
    },
    {
      link: "/progress",
      icon: "bar-chart-2",
      menu: "Progress Bar",
    },
    {
      link: "/toolbar",
      icon: "voicemail",
      menu: "Toolbar",
    },
    {
      link: "/progress-snipper",
      icon: "loader",
      menu: "Progress Snipper",
    },
    {
      link: "/tooltip",
      icon: "bell",
      menu: "Tooltip",
    },
    {
      link: "/snackbar",
      icon: "slack",
      menu: "Snackbar",
    },
    {
      link: "/slider",
      icon: "sliders",
      menu: "Slider",
    },
    {
      link: "/slide-toggle",
      icon: "layers",
      menu: "Slide Toggle",
    },
  ]

  isMobile: boolean;

  token = null;
  tokenExpiredIn = null;
  tokenIsRefreshing = false;
  makingToken = 0;

  registrationPage: boolean;
  hideSidebar = false;
  parentVerifAlreadyChecked = false;

  survey_id = null;
  user_id = null;

  ngOnInit() {
    // @ts-ignore

    if (!localStorage.getItem('client.auth')) {
      window.location.reload();
      window.location.href = '/';
    }
    this.currentUser = this.auth.current().user;

    // this.isMobile = this.deviceService.isMobile() || this.deviceService.isTablet();

    const auth = this.authService.current();
    const tenant = this.settingService.getConfig('client.hostname');

    const data = {
      session_id: this.settingService.getSessionId(),
      action: 'renew'
    };
    this.authService.renewDeleteSession(data).subscribe(
        (resDelete: Auth) => {
          console.log('ters');
          // @ts-ignore
          if (resDelete['message'] === 'No data') {
            Swal.fire({
              allowOutsideClick: false,
              showConfirmButton: false,
              showCancelButton: false,
            });
            Swal.showLoading();
            setTimeout(() => {
              Swal.close();
            }, 1000);
            this.settingService.resetAll();
            window.location.reload();
          } else {
            this.authService.loadPermissions();
          }
        },
        error => {
          // this.toastr.error('[Session]', 'Connection Error');
          this.settingService.resetAll();
          window.location.reload();
        }
    );
    this.router.events.pipe(
        filter(e => e instanceof ActivationEnd),
        buffer(this.router.events.pipe(filter(e => e instanceof NavigationEnd), debounceTime(0))),
        map((events: any[]) => events.reduce((acc, curr) => ({...acc, ...curr.snapshot.data, ...curr.snapshot._routerState}), {}))
    ).subscribe(res => {


      gtag('set', 'user_properties', {
        tenant: tenant,
        user_id: auth.user.uuid,
        roles: auth.roles,
      });

      gtag('config', 'G-QSPC5HJJ9B', {
        'page_path': res['url']
      });

      if (!res['task']) {
        return;
      }

      this.authService.setMenuTask(res);
    });

    this.token = JSON.parse(<string>localStorage.getItem('client.auth'));

    // @ts-ignore
    if (this.token['token']['expires_in']) {
      // @ts-ignore
      this.tokenExpiredIn = new Date(this.token['token']['expires_in']);
      this.initializeClock();
    }
    const idle = new IdleService(this.authService, this.settingService, this.toastr);
  }

  onLogOut() {
    this.auth.logout(true);
  }
  initializeClock() {
    const getTimeRemaining = () => {
      // @ts-ignore
      const t = this.tokenExpiredIn - new Date().getTime();
      const seconds = Math.floor((t / 1000) % 60);
      const minutes = Math.floor((t / 1000 / 60) % 60);
      const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      const days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    };

    let interval: any;
    const updateClock = () => {
      const t = getTimeRemaining();
      if (t.hours < 1) {
        this.refreshToken();
        this.makingToken = 1;
        clearInterval(interval);
      }
      if (t.total <= 0) {
        clearInterval(setInterval(interval));
      }
    };
    if (this.makingToken === 0) {
      // updateClock();
      interval = setInterval(updateClock, 1000);
    }
  }

  refreshToken() {
    this.authService.check(true)
        .subscribe((response: any) => {
          if (response.error === 0) {
            this.settingService.setConfig('client.auth', JSON.stringify(response.result.data));
            this.settingService.setToken(response.result.data.token.access_token);
            // @ts-ignore
            this.tokenExpiredIn = new Date(response.result.data.token['expires_in']);
            console.log(`Token has been refreshed at ${new Date()}`);
            this.makingToken = 0;
            this.initializeClock();
          }
        });
  }
}
