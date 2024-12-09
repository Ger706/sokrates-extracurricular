import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SelectExculCategoryComponent } from './select-excul-category.component';
import {ExtracurricularService} from "../../services/extracurricular.service";
import {PipeModule} from "../../pipes/pipe.module";



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgSelectModule,
        FormsModule,
        PipeModule
    ],
  declarations: [SelectExculCategoryComponent],
  exports: [SelectExculCategoryComponent],
  providers: [ExtracurricularService]
})
export class SelectExculCategoryModule {
}
