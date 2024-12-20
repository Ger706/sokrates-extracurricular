import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {SelectSchoolLocationV2Component} from './select-school-location-v2.component';
import { PipeModule } from '../../pipes/pipe.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    FormsModule,
    PipeModule,
  ],
  declarations: [SelectSchoolLocationV2Component],
  exports: [SelectSchoolLocationV2Component]
})
export class SelectSchoolLocationV2Module {
}
