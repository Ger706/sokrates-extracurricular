import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFlexyModule } from '../demo-flexy-module'
import { DashboardAdminComponent } from './dashboard-admin.component';
import { ParticipantGraphComponent } from './dashboard-admin-components/participant-graph/participant-graph.component';
import { ExtracurricularActivityComponent } from './dashboard-admin-components/activity/extracurricular-activity.component';
import { ProductComponent } from './dashboard-admin-components/product/product.component';
import { CardsComponent } from './dashboard-admin-components/cards/cards.component';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  SelectAcademicYearOnlyModule
} from "../../shared/modules/select-academic-year-only/select-academic-year-only.module";
import {
  SelectSchoolLevelRelationV2Module
} from "../../shared/modules/select-school-level-relation-v2/select-school-level-relation-v2.module";
import {
  ExtracurricularCategorychart
} from "./dashboard-admin-components/extracurricular-chart/extracurricular-category-chart/extracurricular-category-chart";
import {
  ExtracurricularAttendanceChart
} from "./dashboard-admin-components/extracurricular-chart/extracurricular-attendance-chart/extracurricular-attendance-chart";
import {SelectSchoolModule} from "../../shared/modules/select-school/select-school.module";
import {
  ExtracurricularInformationComponent
} from "./dashboard-admin-components/extracurricular-information/extracurricular-information.component";
import {SelectExculModule} from "../../shared/modules/select-excul/select-excul.module";




@NgModule({
  declarations: [
    DashboardAdminComponent,
    ParticipantGraphComponent,
    ExtracurricularCategorychart,
    ExtracurricularAttendanceChart,
    ExtracurricularActivityComponent,
    ExtracurricularInformationComponent,
    ProductComponent,
    CardsComponent,
  ],
  imports: [
    CommonModule,
    DemoFlexyModule,
    FormsModule,
    NgApexchartsModule,
    SelectAcademicYearOnlyModule,
    SelectSchoolLevelRelationV2Module,
    SelectSchoolModule,
    SelectExculModule
  ],
  providers: [
  ],
  exports: [
    DashboardAdminComponent,
    ParticipantGraphComponent,
    ExtracurricularActivityComponent,
    ProductComponent,
  ]
})
export class DashboardAdminModule { }
