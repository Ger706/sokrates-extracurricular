import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import {NgApexchartsModule} from "ng-apexcharts";
import {NgIf} from "@angular/common";
import {
  SelectAcademicYearOnlyModule
} from "../../../shared/modules/select-academic-year-only/select-academic-year-only.module";
import {
  SelectSchoolLevelRelationV2Module
} from "../../../shared/modules/select-school-level-relation-v2/select-school-level-relation-v2.module";
import {FormControl, FormGroup} from "@angular/forms";
import {SelectExculCategoryModule} from "../../../shared/modules/select-excul-category/select-excul-category.module";
import {NgOptionTemplateDirective, NgSelectComponent} from "@ng-select/ng-select";
import {SchoolActivitiesTableModule} from "./school-activities-table/school-activities-table.module";
@Component({
  selector: 'app-school-activities',
  standalone: true,
    imports: [DemoFlexyModule, MatButtonModule, MatTooltipModule, MatIconModule, NgApexchartsModule, NgIf, SelectAcademicYearOnlyModule, SelectSchoolLevelRelationV2Module, SelectExculCategoryModule, NgSelectComponent, NgOptionTemplateDirective, SchoolActivitiesTableModule],
  templateUrl: './school- activities.component.html',
  styleUrls: ['./school-activities.component.scss']
})
export class SchoolActivitiesComponent implements OnInit {
  constructor() { }
  paramForm: FormGroup;
  selectedSchoolLevel = null;
  dataExcul = [];
  hasData: boolean = false;
  task = null;
  loading = false;
  schoolActivities = [
    {
      'school_activity_name': 'Extracurricular'
    },
    {
      'school_activity_name': 'Intracurricular'
    },
    {
      'school_activity_name': 'Lomba'
    },
    {
      'school_activity_name': 'Olimpiade'
    },
  ]

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.paramForm = new FormGroup({
      'name': new FormControl(null),
      'academic_year': new FormControl(null),
      'period_id': new FormControl(null),
      'school_location_id': new FormControl(null),
      'school_level_id': new FormControl(null),
      'year_level_id': new FormControl(null),
      'school_level_relation_id': new FormControl(null)
    });
  }

  onChangeSchoolActivity(item: any) {
    this.paramForm.controls['school_activity'].markAsTouched();
    this.paramForm.controls['school_activity'].setValue(item ? item.school_activity : null);

    this.selectedSchoolLevel = item ? item.school_level_id : null;
  }

}