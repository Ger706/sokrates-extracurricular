import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexFill,
  ApexXAxis,
  ApexGrid, ApexNonAxisChartSeries, ApexResponsive, ApexYAxis, ApexTitleSubtitle
} from 'ng-apexcharts';
import {FormControl, FormGroup} from "@angular/forms";
import {Extracurricular} from "../../../../../shared/models/extracurricular.model";
import {ExtracurricularService} from "../../../../../shared/services/extracurricular.service";
import {TranslateService} from "../../../../../shared/services/translate.service";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};

@Component({
  selector: 'app-school-program-attendance-chart',
  templateUrl: './school-program-attendance-chart.component.html',
  styleUrls: ['./school-program-attendance-chart.scss'],

})
export class SchoolProgramAttendanceChart implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions !: Partial<ChartOptions> | any;

  constructor(
      private exculService: ExtracurricularService,
      private translate: TranslateService,
      private cd: ChangeDetectorRef
  ) {
    translate.load("main", "extracurricular");

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
        title: {
          text: undefined
        }
      },
      tooltip: {
        y: {
          formatter: function (val: string) {
            return val;
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40
      },
    };
  }

  paramForm: FormGroup;
  selectedSchool = null;
  dataExcul = [];
  hasData: boolean = false;
  task = null;
  loading = false;
  byLocation = false;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.paramForm = new FormGroup({
      'academic_year': new FormControl(null),
      'school_id': new FormControl(null),
    });
  }

  onChangeAcademicYear(item: any) {
    this.paramForm.controls['academic_year'].markAsTouched();
    this.paramForm.controls['academic_year'].setValue(item ? item.academic_year : null);
    this.getFilteredExcul();
  }

  onChangeSchool(item: any) {
    this.paramForm.controls['school_id'].markAsTouched();
    this.paramForm.controls['school_id'].setValue(item ? item.school_id : null);

    this.selectedSchool = item ? item.school_id : null;
    this.getFilteredExcul();
  }

  getFilteredExcul(school_location_id: any = null) {
    this.hasData = false;
    this.loading = true;
    this.exculService.getAttendanceSummary({
      academic_year: this.paramForm.value.academic_year || null,
      school_id: this.paramForm.value.school_id || null,
      school_location_id: school_location_id || null
    })
        .subscribe(
            (response: Extracurricular[]) => {
              // @ts-ignore
              if (response['error'] === 0) {
                // @ts-ignore
                this.dataExcul = response['result'].slice();
                this.hasData = this.dataExcul.length > 0;
                let schoolShortAddress = null;
                let exculName = null;
                if (!school_location_id) {
                  this.byLocation = false;
                  schoolShortAddress = this.dataExcul.map((i: any) => i.school_short_address);
                } else {
                  this.byLocation = true;
                  exculName = this.dataExcul.map((i: any) => i.extracurricular_name);
                }
                const present = this.dataExcul.map((i: any) => i.total_present);
                const absent = this.dataExcul.map((i: any) => i.total_absent);
                const dataForSchoolLocation = this.dataExcul;
                this.chartOptions.series = [
                  {
                    name: "Present",
                    data: present,
                  },
                  {
                    name: "Absent",
                    data: absent,
                  }
                ]
                this.chartOptions.chart = {
                  type: "bar",
                  stacked: true,
                  height: this.dataExcul.length <= 2 ? 250 : 60 * this.dataExcul.length,
                  events: {
                    dataPointSelection: (event: any, chartContext: any, config: any) => {
                      // @ts-ignore
                      const schoolLocation = dataForSchoolLocation[config.dataPointIndex].school_location_id;
                      if (!school_location_id) {
                        this.getFilteredExcul(schoolLocation);
                      }
                    }
                  }
                }
                // @ts-ignore
                if (!school_location_id) {
                  this.chartOptions.xaxis = {
                    categories: schoolShortAddress,
                    labels: {
                      formatter: function (val: string) {
                        return val;
                      },
                    },
                  };
                } else {
                  this.chartOptions.xaxis = {
                    categories: exculName,
                    labels: {
                      formatter: function (val: string) {
                        return val;
                      },
                    },
                  };
                }

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


