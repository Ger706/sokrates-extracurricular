import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SelectExculComponent } from './select-excul.component';
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
  declarations: [SelectExculComponent],
  exports: [SelectExculComponent],
  providers: [ExtracurricularService]
})
export class SelectExculModule {
}
