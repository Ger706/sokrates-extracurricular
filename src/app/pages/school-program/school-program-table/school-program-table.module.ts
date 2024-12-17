import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolProgramTableComponent } from "./school-program-table.component";
import { PipeModule } from "../../../../shared/pipes/pipe.module";
import { MatCard } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";  // This is the correct import
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatPaginator } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { NgxPaginationModule } from "ngx-pagination";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgSelectModule,
        FormsModule,
        PipeModule,
        MatCard,
        MatIcon,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatTableModule,
        MatProgressSpinner,
        MatPaginator,
        MatInputModule,
        FaIconComponent,
        NgxPaginationModule,
        NgxDatatableModule
    ],
    declarations: [SchoolProgramTableComponent],
    exports: [SchoolProgramTableComponent],
    providers: []
})
export class SchoolProgramTableModule { }
