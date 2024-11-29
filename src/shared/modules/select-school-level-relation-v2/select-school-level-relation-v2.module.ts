import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {SelectSchoolLevelRelationV2Component} from './select-school-level-relation-v2.component';
import {PipeModule} from "../../pipes/pipe.module";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    FormsModule,
    PipeModule
  ],
  declarations: [SelectSchoolLevelRelationV2Component],
  exports: [SelectSchoolLevelRelationV2Component]
})
export class SelectSchoolLevelRelationV2Module {
}
