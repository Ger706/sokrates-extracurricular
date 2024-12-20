import {NgModule} from "@angular/core";
import {SchoolActivityComponent} from "./school-activity.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FeatherModule} from "angular-feather";
import {MatCard, MatCardContent} from "@angular/material/card";
import {SchoolProgramTableModule} from "../school-program/school-program-table/school-program-table.module";

@NgModule({
  declarations: [
      SchoolActivityComponent
  ],
    imports: [
        FaIconComponent,
        FeatherModule,
        MatCard,
        MatCardContent,
        SchoolProgramTableModule
    ],
    exports: [
        SchoolActivityComponent
    ]
})

export class SchoolActivityModules {}
