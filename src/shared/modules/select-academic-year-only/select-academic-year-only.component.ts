import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {AcademicYear} from "../../models/academic-year.model";
import {AcademicCalendarService} from "../../services/academic-calendar.service";

@Component({
  selector: 'app-select-academic-year-only',
  templateUrl: './select-academic-year-only.component.html',
  styleUrls: ['./select-academic-year-only.component.css']
})
export class SelectAcademicYearOnlyComponent implements OnInit {

  heading = 'Academic Year Select';
  academicYearValue: string;
  academicYears: any;
  currentAcademicYear: any;
  periodId: number;
  loading: boolean;
  tempOfPeriod: any;

  @Output()
  academicYearChanged = new EventEmitter<AcademicYear>();

  @Input()
  academic_year = null;

  @Input()
  all = false;

  @Input()
  approver_setup_module = null;

  @Input()
  isDisabled = false;

  placeholder= "{{(all ? 'ALL' : 'SELECT') | translate}} {{ 'ACADEMIC_YEAR' | translate }}"


  constructor(private acService: AcademicCalendarService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getAcademicYear();
  }

  getAcademicYear() {
    this.loading = true;
    // @ts-ignore
    this.acService.getAcademicYearsOnly({
      approver_setup_module: this.approver_setup_module,
    })
        .subscribe((response: any) => {
          if (response['error'] === 0) {
            // @ts-ignore
            let tempOfAcademicYear = [];
            this.academicYears = response['result']['data'];
            this.tempOfPeriod = this.academicYears;
            // @ts-ignore
            this.academicYears = this.academicYears.map(function(i) {
              return i.academic_year;
            });
            this.academicYears = this.academicYears.filter((v: any, i: any, a: string | any[]) => a.indexOf(v) === i);

            this.academicYears.forEach(function(i: any) {
              tempOfAcademicYear.push({
                academic_year: i,
                period_id: null,
              });
            });
            // @ts-ignore
            tempOfAcademicYear = tempOfAcademicYear;
            this.academicYears = tempOfAcademicYear;
            this.getCurrentAcademicYear();
          } else {
            this.loading = false;
            this.toastr.error('[' + this.heading + '] ' + response['message'], 'Invalid Response');
          }
        }, (error: any) => {
          this.loading = false;
          this.toastr.error('[' + this.heading + '] Cannot access server endpoint!', 'Connection Error');
        });
  }

  getCurrentAcademicYear() {
    this.acService.getAcademicYearsOnlyCurrent()
        .subscribe((response: AcademicYear) => {
          // @ts-ignore
          if (response['error'] === 0) {
            this.loading = false;
            // @ts-ignore
            this.currentAcademicYear = new AcademicYear().deserialize(response['result']['data']);
            let current;
            let currentPeriod;
            currentPeriod = this.currentAcademicYear;
            if (this.academic_year) {
              // @ts-ignore
              current = this.academicYears.find(i => i.academic_year === this.academic_year);
            } else {
              // @ts-ignore
              current = this.academicYears.find(i => i.academic_year === this.currentAcademicYear.academic_year);
            }

            if (currentPeriod) {
              // @ts-ignore
              this.academicYears.map(function(i) {
                i.academic_year = i.academic_year;
                i.period_id = currentPeriod.period_id;
              });
            }


            if (current) {
              // @ts-ignore
              this.academicYears.forEach(function(i) {
                i.period_id = currentPeriod.period_id;
              });

              this.academicYearValue = current.academic_year;
              // @ts-ignore
              this.academicYearChanged.emit(this.academicYears.find(i => i.academic_year === this.academicYearValue));
            }
          } else {
            this.loading = false;
            // @ts-ignore
            this.toastr.error('[' + this.heading + '] ' + response['message'], 'Invalid Response');
          }
        }, (error: any) => {
          this.loading = false;
          this.toastr.error('[' + this.heading + '] Cannot access server endpoint!', 'Connection Error');
        });
  }

  onChange(item: any) {
    if (!this.academicYearValue) {
      // @ts-ignore
      this.academicYearChanged.emit(null);
      return;
    }

    // @ts-ignore
    this.academicYearChanged.emit(this.academicYears.find(i => i.academic_year === item.academic_year));
  }

  onlyUnique(value: any, index: any, self: string | any[]) {
    return self.indexOf(value) === index;
  }

}
