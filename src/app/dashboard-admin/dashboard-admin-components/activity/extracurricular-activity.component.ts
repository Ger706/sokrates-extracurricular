import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Extracurricular} from "../../../../shared/models/extracurricular.model";
import {ExtracurricularService} from "../../../../shared/services/extracurricular.service";
import {TranslateService} from "../../../../shared/services/translate.service";
import {AcademicYear} from "../../../../shared/models/academic-year.model";
import {AcademicCalendarService} from "../../../../shared/services/academic-calendar.service";

interface activity {
  time: string;
  ringColor: string;
  message: string;
}

@Component({
  selector: 'app-activity',
  templateUrl: './extracurricular-activity.component.html',
})
export class ExtracurricularActivityComponent implements OnInit {

  constructor(private exculService : ExtracurricularService,
              private translate: TranslateService,
              private cd: ChangeDetectorRef,
              private academicService: AcademicCalendarService) {
    translate.load('main', 'extracurricular/excul-participant');
  }

  activity: activity [] = [
    {
      time: "09.50",
      ringColor: "ring-success",
      message: "Meeting with John",
    },
    {
      time: "09.46",
      ringColor: "ring-primary",
      message: "Payment received from John Doe of $385.90",
    },
    {
      time: "09.47",
      ringColor: "ring-info",
      message: "Project Meeting",
    },
    {
      time: "09.48",
      ringColor: "ring-warning",
      message: "New Sale recorded #ML-3467",
    },
    {
      time: "09.49",
      ringColor: "ring-danger",
      message: "Payment was made of $64.95 to Michael Anderson",
    },
  ]
  paramForm: FormGroup;
  selectedSchoolLevel = null;
  dataExcul = [];
  hasData: boolean = false;
  task = null;
  loading = false;
  currentAcademic : AcademicYear | null = null;

  ngOnInit() {
    this.initForm();
    this.getCurrentAcademicYear();
  }
  initForm() {
    this.paramForm = new FormGroup({
      'academic_year': new FormControl(null),
      'school_location_id': new FormControl(null),
      'school_level_id': new FormControl(null),
      'year_level_id': new FormControl(null),
      'school_level_relation_id': new FormControl(null)
    });
  }

  onChangeSchoolLevelRelation(item: any) {
    this.paramForm.controls['school_location_id'].markAsTouched();
    this.paramForm.controls['school_location_id'].setValue(item ? item.school_location_id : null);

    this.paramForm.controls['school_level_id'].markAsTouched();
    this.paramForm.controls['school_level_id'].setValue(item ? item.school_level_id : null);

    this.selectedSchoolLevel = item ? item.school_level_id : null;

    if (this.paramForm.value.school_level_id) {
      this.getExtracurricularCurrentActivity();
    }
  }
  getCurrentAcademicYear() {
    this.academicService.getAcademicYearsOnlyCurrent()
        .subscribe((response: AcademicYear) => {
          // @ts-ignore
          if (response['error'] === 0) {
            // @ts-ignore
            this.currentAcademic = new AcademicYear().deserialize(response['result']['data']);
          } else {
            // @ts-ignore
            // this.toastr.error('[' + this.heading + '] ' + response['message'], 'Invalid Response');
          }
        }, (error: any) => {
          // this.toastr.error('[' + this.heading + '] Cannot access server endpoint!', 'Connection Error');
        });
  }
  getExtracurricularCurrentActivity() {
    this.loading = true;
    this.hasData = false;
    this.exculService.getCurrentDateExtracurricular({
      // @ts-ignore
      academic_year: this.currentAcademic ? this.currentAcademic.academic_year : null,
      school_location_id: this.paramForm.value.school_location_id || null,
    })
        .subscribe(
            (response: Extracurricular[]) => {
              // @ts-ignore
              if (response['error'] === 0) {
                // @ts-ignore
                this.dataExcul = response['result'].slice();

                this.hasData = this.dataExcul.length > 0;
                this.loading = false;
                this.cd.detectChanges();
              } else {
                this.loading = false;
                // this.toastr.error('[' + this.heading + '] ' + response['message'], 'Invalid Response');
              }
            },
            error => {
              this.loading = false;
              // this.toastr.error('[' + this.heading + '] Cannot access server endpoint!', 'Connection Error');
            });
  }



}