import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Extracurricular} from "../../../../shared/models/extracurricular.model";
import {ExtracurricularService} from "../../../../shared/services/extracurricular.service";
import {TranslateService} from "../../../../shared/services/translate.service";
import {AcademicYear} from "../../../../shared/models/academic-year.model";
import {AcademicCalendarService} from "../../../../shared/services/academic-calendar.service";
import {ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent} from "ng-apexcharts";
import {ChartOptions} from "../school-program-chart/school-program-attendance-chart/school-program-attendance-chart";

export type DonutOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-school-program-information',
  templateUrl: './school-program-information.component.html',
  styleUrls: ['./school-program-information.component.scss'],
})

export class SchoolProgramInformationComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions !: Partial<ChartOptions> | any;

  @ViewChild("chartD") chartD: ChartComponent;
  public donutOptions !: Partial<DonutOptions> | any;

  constructor(private exculService : ExtracurricularService,
              private translate: TranslateService,
              private cd: ChangeDetectorRef,
              private academicService: AcademicCalendarService) {
    translate.load('main', 'extracurricular');

    this.chartOptions = {
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      yaxis: {
        labels: {
          show: false,
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40
      }
    };

    this.donutOptions = {
      chart: {
        width: "80%",
        type: "donut"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  genderData: [];
  paramForm: FormGroup;
  selectedSchoolLevel = null;
  hasData: boolean = false;
  hasDataAttendance: boolean = false;
  task = null;
  dataExcul = [];
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
      'school_level_relation_id': new FormControl(null),
      'excul_id': new FormControl(null),
    });
  }
  onChangeExcul(item: any) {
    this.paramForm.controls['excul_id'].markAsTouched();
    this.paramForm.controls['excul_id'].setValue(item ? item.excul_id : null);

    if (item.excul_id) {
      this.getExtracurricularGender();
      this.getFilteredExcul();
    }

  }
  onChangeSchoolLevelRelation(item: any) {
    this.paramForm.controls['school_location_id'].markAsTouched();
    this.paramForm.controls['school_location_id'].setValue(item ? item.school_location_id : null);

    this.paramForm.controls['school_level_id'].markAsTouched();
    this.paramForm.controls['school_level_id'].setValue(item ? item.school_level_id : null);

    this.selectedSchoolLevel = item ? item.school_level_id : null;
    this.paramForm.controls['excul_id'].setValue(null);
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
  getExtracurricularGender() {
    this.genderData = [];
    this.loading = true;
    this.hasData = false;
    this.exculService.getExtracurricularGenderSummary(
      this.paramForm.value.excul_id || null,
    )
        .subscribe(
            (response: Extracurricular[]) => {
              // @ts-ignore
              if (response['error'] === 0) {
                // @ts-ignore
                this.genderData = response['result']['data'].slice();
                this.hasData = this.genderData.length > 0;
                this.loading = false;

                if (!this.hasData) {
                  return;
                }
                this.chartOptions.series = [
                  {
                    name: "Male",
                    // @ts-ignore
                    data: [this.genderData[0].male_student],
                    color: '#67A3D9'
                  },
                  {
                    name: "Female",
                    // @ts-ignore
                    data: [this.genderData[0].female_student],
                    color: '#F8B7CD'
                  }
                ]
                this.chartOptions.chart = {
                  type: 'bar',
                  height: 125,
                  stacked: true,
                  stackType: '100%'
                };
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
  getFilteredExcul() {
    this.hasDataAttendance = false;
    this.loading = true;
    this.exculService.getAttendanceSummary({
      academic_year: this.currentAcademic ? this.currentAcademic.academic_year : null,
      school_id: this.paramForm.value.school_id || null,
      excul_id: this.paramForm.value.excul_id || null,
    })
        .subscribe(
            (response: Extracurricular[]) => {
              // @ts-ignore
              if (response['error'] === 0) {
                // @ts-ignore
                this.dataExcul = response['result'].slice();
                this.hasDataAttendance = this.dataExcul.length > 0;
                if (!this.hasDataAttendance) {
                  return;
                }
                // @ts-ignore
                this.donutOptions.series = [this.dataExcul[0].total_present, this.dataExcul[0].total_absent];
                this.donutOptions.labels = ['Present','Absent'];
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
