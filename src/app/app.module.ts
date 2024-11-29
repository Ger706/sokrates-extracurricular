import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullComponent } from './layouts/full/full.component';
import { DemoFlexyModule } from './demo-flexy-module'
import { ComponentsModule } from './components/components.module';
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

@NgModule({
  declarations: [
    AppComponent,
    FullComponent
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
    ToastrModule.forRoot()
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
    SchoolAndLocationService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
