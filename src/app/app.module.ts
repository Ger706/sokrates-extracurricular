import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullComponent } from './layouts/full/full.component';
import { DemoFlexyModule } from './demo-flexy-module'
import { ComponentsModule } from './pages/components.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ExtracurricularService } from "../shared/services/extracurricular.service";
import { SettingService } from "../shared/services/setting.service";
import { LocalStorageService } from "../shared/services/localstorage.service";
import { AcademicCalendarService } from "../shared/services/academic-calendar.service";
import { ToastrService, ToastrModule } from "ngx-toastr";
import {YearLevelMappingService} from "../shared/services/year-level-mapping.service";
import {AuthService} from "../shared/services/auth.service";
import {TranslateService} from "../shared/services/translate.service";
import {DashboardAdminModule} from "./dashboard-admin/dashboard-admin.module";
import {SchoolAndLocationService} from "../shared/services/school-and-location.service";
import {LoginComponent} from "./authentication/side-login/login.component";
import {NgOtpInputComponent} from "ng-otp-input";
import {UserService} from "../shared/services/user.service";
import {WebsiteService} from "../shared/services/website.service";
import {WINDOW} from "../shared/providers/window.provider";
import {Auth} from "../shared/models/auth.model";
import {AuthComponent} from "./authentication/auth.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {ExtracurricularCategoryService} from "../shared/services/extracurricular-category.service";
import {ExtracurricularRuleService} from "../shared/services/extracurricular-rule.service";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
      AuthComponent,
      LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardAdminModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgOtpInputComponent,
    FontAwesomeModule,
    MatTableModule
  ],
  providers: [ ExtracurricularService,
    SettingService,
    LocalStorageService,
    HttpClient,
    AcademicCalendarService,
    ToastrService,
    YearLevelMappingService,
    AuthService,
    TranslateService,
    SchoolAndLocationService,
    UserService,
    WebsiteService,
    ExtracurricularCategoryService,
      ExtracurricularRuleService,
    { provide: WINDOW, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
