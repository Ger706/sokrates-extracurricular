import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "../../../shared/services/translate.service";
@Component({
  selector: 'app-school-program',
  templateUrl: './school-program.component.html',
  styleUrls: ['./school-program.component.scss']
})
export class SchoolProgramComponent implements OnInit {
  @ViewChild('addSchoolProgram', {static: true}) public modalAddSchoolProgram: NgbModalRef;
  @ViewChild('addCategory', {static: true}) public modalAddCategory: NgbModalRef;
  constructor(
      private modalService: NgbModal,
      private cd: ChangeDetectorRef,
      private translate: TranslateService
  ) {
    translate.load('main', 'extracurricular');
  }
  paramForm: FormGroup;
  hasData: boolean = false;
  task = null;
  searchText: string = '';
  loading = false;
  addProgramForm :FormGroup;
  addCategoryForm :FormGroup;
  disableCategorySubmit = true;
  ngOnInit() {
    this.initForm();
    this.trackFormChanges();
  }
  trackFormChanges() {
    this.addCategoryForm.valueChanges.subscribe(() => {
      this.disableCategorySubmit =
          !this.addCategoryForm.get('school_program_id')?.value ||
          !this.addCategoryForm.get('category_name')?.value ||
          !this.addCategoryForm.get('description')?.value;
    });
  }
  filter(event: any) {

  }
  initForm() {

    this.addProgramForm = new FormGroup({
      'school_program_name': new FormControl(null),
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
      'school_program_id': new FormControl(null),
      'category_name': new FormControl(null),
      'description': new FormControl(null),
    })
  }

  onChangeSchoolProgram(item: any) {
    this.addCategoryForm.controls['school_program_id'].markAsTouched();
    this.addCategoryForm.controls['school_program_id'].setValue(item ? item.school_program_id : null);
  }

  onChangeSchoolLocation(item: any) {
    this.paramForm.controls['school_location_id'].markAsTouched();
    this.paramForm.controls['school_location_id'].setValue(item ? item.school_location_id : null);
  }

  onOpenModelAddSchoolProgram () {
    this.modalService.open(this.modalAddSchoolProgram, {
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

  onAddSchoolProgram() {
    console.log(this.addProgramForm.value);
  }

  onAddCategory() {
    console.log(this.addCategoryForm.value);
  }

}
