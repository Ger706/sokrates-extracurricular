import { NgModule } from '@angular/core';
import {RulesComponent} from "./rules.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatButtonModule} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {
    MatCell, MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef,
    MatTable
} from "@angular/material/table";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgxPaginationModule} from "ngx-pagination";
import {
    SelectAcademicYearOnlyModule
} from "../../../shared/modules/select-academic-year-only/select-academic-year-only.module";
import {SelectSchoolModule} from "../../../shared/modules/select-school/select-school.module";
import {
    SelectSchoolLevelRelationV2Module
} from "../../../shared/modules/select-school-level-relation-v2/select-school-level-relation-v2.module";
import {NgForOf, NgIf} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import {SelectSchoolActivityModule} from "../../../shared/modules/select-school-activity/select-school-activity.module";
import {
    SelectYearLevelRelationV2Module
} from "../../../shared/modules/select-year-level-relation-v2/select-year-level-relation-v2.module";
@NgModule({
    declarations: [
        RulesComponent
    ],
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatRadioModule,
        MatButtonModule,
        MatCard,
        MatCardContent,
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        FaIconComponent,
        NgxDatatableModule,
        MatHeaderRow,
        NgxPaginationModule,
        MatRow,
        SelectAcademicYearOnlyModule,
        SelectSchoolModule,
        SelectSchoolLevelRelationV2Module,
        NgIf,
        MatHeaderRowDef,
        MatRowDef,
        MatHeaderCellDef,
        MatCellDef,
        NgForOf,
        MatPaginator,
        SelectSchoolActivityModule,
        SelectYearLevelRelationV2Module,
    ],

    exports: [
        RulesComponent
    ]
})
export class RulesModule { }
