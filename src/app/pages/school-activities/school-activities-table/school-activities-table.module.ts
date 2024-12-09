import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SchoolActivitiesTableComponent} from "./school-activities-table.component";
import {PipeModule} from "../../../../shared/pipes/pipe.module";
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatTable} from "@angular/material/table";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatPaginator} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgSelectModule,
        FormsModule,
        PipeModule,
        MatCard,
        MatIcon,
        MatFormField,
        ReactiveFormsModule,
        MatTable,
        MatProgressSpinner,
        MatPaginator,
        MatInputModule,
        MatFormFieldModule
    ],
    declarations: [SchoolActivitiesTableComponent],
    exports: [SchoolActivitiesTableComponent],
    providers: []
})
export class SchoolActivitiesTableModule {
}
