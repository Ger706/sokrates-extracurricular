import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {SelectYearLevelRelationV2Component} from './select-year-level-relation-v2.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    FormsModule
  ],
  declarations: [SelectYearLevelRelationV2Component],
  exports: [SelectYearLevelRelationV2Component]
})
export class SelectYearLevelRelationV2Module {
}
