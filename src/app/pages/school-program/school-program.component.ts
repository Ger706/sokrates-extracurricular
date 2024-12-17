import {ChangeDetectorRef, Component, OnChanges, OnInit, ViewChild} from '@angular/core';
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
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {SelectExculCategoryModule} from "../../../shared/modules/select-excul-category/select-excul-category.module";
import {NgOptionTemplateDirective, NgSelectComponent} from "@ng-select/ng-select";
import {NgOtpInputComponent} from "ng-otp-input";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {SelectSchoolActivityModule} from "../../../shared/modules/select-school-activity/select-school-activity.module";
import {SchoolProgramTableModule} from "./school-program-table/school-program-table.module";
@Component({
  selector: 'app-school-program',
  standalone: true,
  imports: [DemoFlexyModule, MatButtonModule, MatTooltipModule, MatIconModule, NgApexchartsModule, NgIf, SelectAcademicYearOnlyModule, SelectSchoolLevelRelationV2Module, SelectExculCategoryModule, NgSelectComponent, NgOptionTemplateDirective, SchoolProgramTableModule, FormsModule, NgOtpInputComponent, ReactiveFormsModule, SelectSchoolActivityModule],
  templateUrl: './school-program.component.html',
  styleUrls: ['./school-program.component.scss']
})
export class SchoolProgramComponent implements OnInit {
  @ViewChild('addSchoolActivity', {static: true}) public modalAddSchoolActivity: NgbModalRef;
  @ViewChild('addCategory', {static: true}) public modalAddCategory: NgbModalRef;
  constructor(
      private modalService: NgbModal,
      private cd: ChangeDetectorRef
  ) { }
  paramForm: FormGroup;
  hasData: boolean = false;
  task = null;
  loading = false;
  addActivityForm :FormGroup;
  addCategoryForm :FormGroup;
  disableCategorySubmit = true;
  ngOnInit() {
    this.initForm();
    this.trackFormChanges();
  }
  trackFormChanges() {
    this.addCategoryForm.valueChanges.subscribe(() => {
      this.disableCategorySubmit =
          !this.addCategoryForm.get('school_activity_id')?.value ||
          !this.addCategoryForm.get('category_name')?.value ||
          !this.addCategoryForm.get('description')?.value;
    });
  }
  initForm() {

    this.addActivityForm = new FormGroup({
      'school_activity_name': new FormControl(null),
      'description': new FormControl(null),
    })
    this.paramForm = new FormGroup({
      'name': new FormControl(null),
      'academic_year': new FormControl(null),
      'period_id': new FormControl(null),
      'school_location_id': new FormControl(null),
      'school_level_id': new FormControl(null),
      'year_level_id': new FormControl(null),
      'school_level_relation_id': new FormControl(null)
    });
    this.addCategoryForm = new FormGroup({
      'school_activity_id': new FormControl(null),
      'category_name': new FormControl(null),
      'description': new FormControl(null),
    })
  }

  onChangeSchoolActivity(item: any) {
    this.addCategoryForm.controls['school_activity_id'].markAsTouched();
    this.addCategoryForm.controls['school_activity_id'].setValue(item ? item.school_activity_id : null);
  }


  onOpenModelAddSchoolActivity () {
    this.modalService.open(this.modalAddSchoolActivity, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      size: 'lg'
    }).result.then((result: any) => {

    }, (reason: any) => {

    });
  }

  onOpenModelAddCategory () {
    this.modalService.open(this.modalAddCategory, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      size: 'lg'
    }).result.then((result: any) => {

    }, (reason: any) => {

    });
  }

  onAddSchoolActivity() {
    console.log(this.addActivityForm.value);
  }

  onAddCategory() {
    console.log(this.addCategoryForm.value);
  }

}
