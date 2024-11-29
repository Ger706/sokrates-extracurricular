import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SelectAcademicYearOnlyComponent } from './select-academic-year-only.component';
import {PipeModule} from '../../pipes/pipe.module';
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    FormsModule,
    PipeModule
  ],
  declarations: [SelectAcademicYearOnlyComponent],
  exports: [SelectAcademicYearOnlyComponent]
})
export class SelectAcademicYearOnlyModule {
}
