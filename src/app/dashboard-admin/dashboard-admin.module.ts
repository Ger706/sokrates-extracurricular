import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFlexyModule } from '../demo-flexy-module'
import { DashboardAdminComponent } from './dashboard-admin.component';
import { ParticipantGraphComponent } from './dashboard-admin-components/participant-graph/participant-graph.component';
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
import {SelectSchoolModule} from "../../shared/modules/select-school/select-school.module";
import {SelectExculModule} from "../../shared/modules/select-excul/select-excul.module";
import {
  SchoolProgramCategoryChart
} from "./dashboard-admin-components/school-program-chart/school-program-category-chart/school-program-category-chart";
import {
  SchoolProgramAttendanceChart
} from "./dashboard-admin-components/school-program-chart/school-program-attendance-chart/school-program-attendance-chart";
import {
  SchoolProgramInformationComponent
} from "./dashboard-admin-components/school-program-information/school-program-information.component";
import {
  SchoolProgramActivityComponent
} from "./dashboard-admin-components/school-program-activity/school-program-activity.component";




@NgModule({
  declarations: [
    DashboardAdminComponent,
    ParticipantGraphComponent,
    SchoolProgramCategoryChart,
    SchoolProgramAttendanceChart,
   SchoolProgramActivityComponent,
    SchoolProgramInformationComponent,
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
    ProductComponent,
  ]
})
export class DashboardAdminModule { }
