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
  selector: 'app-extracurricular-attendance-chart',
  templateUrl: './extracurricular-attendance-chart.component.html',
  styleUrls: ['./extracurricular-attendance-chart.scss'],

})
export class ExtracurricularAttendanceChart implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions !: Partial<ChartOptions> | any;

  constructor(
      private exculService: ExtracurricularService,
      private translate: TranslateService,
      private cd: ChangeDetectorRef
  ) {
    translate.load("main", "extracurricular/excul-participant");

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
          formatter: function(val: string) {
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
      }
    };
  }

  paramForm: FormGroup;
  selectedSchool = null;
  dataExcul = [];
  hasData: boolean = false;
  task = null;
  loading = false;

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

  getFilteredExcul() {
    this.hasData = false;
    this.loading = true;
    this.exculService.getAttendanceSummary({
      academic_year: this.paramForm.value.academic_year || null,
      school_id: this.paramForm.value.school_id || null
    })
        .subscribe(
            (response: Extracurricular[]) => {
              // @ts-ignore
              if (response['error'] === 0) {
                // @ts-ignore
                this.dataExcul = response['result'].slice();
                this.hasData = this.dataExcul.length > 0;
                const schoolShortAddress = this.dataExcul.map((i: any) => i.school_short_address);
                const present = this.dataExcul.map((i: any) => i.total_present);
                const absent = this.dataExcul.map((i: any) => i.total_absent);

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
                  height: this.dataExcul.length < 2 ? 250 : 60 * this.dataExcul.length
                };

                this.chartOptions.xaxis = {
                  categories: schoolShortAddress,
                      labels: {
                    formatter: function(val: string) {
                      return val;
                    }
                  }
                };
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


