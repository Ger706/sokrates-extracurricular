import {NgModule} from "@angular/core";
import {DemoFlexyModule} from "../../demo-flexy-module";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {NgApexchartsModule} from "ng-apexcharts";
import {NgIf} from "@angular/common";
import {
    SelectAcademicYearOnlyModule
} from "../../../shared/modules/select-academic-year-only/select-academic-year-only.module";
import {
    SelectSchoolLevelRelationV2Module
} from "../../../shared/modules/select-school-level-relation-v2/select-school-level-relation-v2.module";
import {SelectExculCategoryModule} from "../../../shared/modules/select-excul-category/select-excul-category.module";
import {NgOptionTemplateDirective, NgSelectComponent} from "@ng-select/ng-select";
import {SchoolProgramTableModule} from "./school-program-table/school-program-table.module";
import {FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {SelectSchoolActivityModule} from "../../../shared/modules/select-school-activity/select-school-activity.module";
import {SchoolProgramComponent} from "./school-program.component";
import {MatCard} from "@angular/material/card";
import {
    SelectSchoolLocationV2Module
} from "../../../shared/modules/select-school-location-v2/select-school-location-v2.module";
@NgModule({
    declarations: [
        SchoolProgramComponent
    ],
    imports: [
        DemoFlexyModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        NgApexchartsModule,
        NgIf,
        SelectAcademicYearOnlyModule,
        SelectSchoolLevelRelationV2Module,
        SelectExculCategoryModule,
        NgSelectComponent,
        NgOptionTemplateDirective,
        FormsModule,
        ReactiveFormsModule,
        SelectSchoolActivityModule,
        FormsModule,
        ReactiveFormsModule,
        MatCard,
        SchoolProgramTableModule,
        SelectSchoolLocationV2Module
    ],
    exports: [
        SchoolProgramComponent,
    ]
})

export class SchoolProgramModule { }
