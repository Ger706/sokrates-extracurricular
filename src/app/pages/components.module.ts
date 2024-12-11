import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsComponent } from './forms/forms.component';
import { DemoFlexyModule } from '../demo-flexy-module';
import { GridListComponent } from './grid-list/grid-list.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ProgressComponent } from './progress/progress.component';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { TooltipsComponent } from './tooltips/tooltips.component'
import {SchoolActivitiesComponent} from "./school-activities/school-activities.component";
import {SelectExculModule} from "../../shared/modules/select-excul/select-excul.module";
import {SelectExculCategoryModule} from "../../shared/modules/select-excul-category/select-excul-category.module";
import {SelectExculCategoryComponent} from "../../shared/modules/select-excul-category/select-excul-category.component";
import {SelectExculComponent} from "../../shared/modules/select-excul/select-excul.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {
  SchoolActivitiesTableComponent
} from "./school-activities/school-activities-table/school-activities-table.component";
import {SchoolActivitiesTableModule} from "./school-activities/school-activities-table/school-activities-table.module";


@NgModule({
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    SchoolActivitiesComponent,
    SlideToggleComponent,
    SliderComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    FormsComponent,
    AlertsComponent,
    GridListComponent,
    TooltipsComponent,
    FormsModule,
      NgSelectModule,
    SelectExculCategoryModule,
    SelectExculModule,
      SchoolActivitiesTableModule
  ],
  exports: [
    AlertsComponent,
    FormsComponent,
    GridListComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    SchoolActivitiesComponent
  ]
})
export class ComponentsModule { }