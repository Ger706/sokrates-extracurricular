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
  ApexGrid, ApexNonAxisChartSeries, ApexResponsive
} from 'ng-apexcharts';
import {FormControl, FormGroup} from "@angular/forms";
import {Extracurricular} from "../../../../../shared/models/extracurricular.model";
import {ExtracurricularService} from "../../../../../shared/services/extracurricular.service";
import {TranslateService} from "../../../../../shared/services/translate.service";


export interface ChartOptions {
  chart: ApexChart;
  series: ApexNonAxisChartSeries;
  labels: string[];
  responsive: ApexResponsive[];
}

@Component({
  selector: 'app-extracurricular-category-chart',
  templateUrl: './extracurricular-category-chart.component.html',
  styleUrls: ['./extracurricular-category-chart.scss'],

})
export class ExtracurricularCategorychart implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions !: Partial<ChartOptions> | any;

  constructor(
      private exculService: ExtracurricularService,
      private translate: TranslateService,
      private cd: ChangeDetectorRef
  ) {
    translate.load("main", "extracurricular/excul-participant");

    this.chartOptions = {
      chart: {
        width: 450,
        type: "pie"
      },
      fill: {
        type: "gradient"
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

  paramForm: FormGroup;
  selectedSchoolLevel = null;
  dataExcul = [];
  hasData: boolean = false;
  task = null;
  loading = false;

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

  onChangeAcademicYear(item: any) {
    this.paramForm.controls['academic_year'].markAsTouched();
    this.paramForm.controls['academic_year'].setValue(item ? item.academic_year : null);

    this.paramForm.controls['period_id'].markAsTouched();
    this.paramForm.controls['period_id'].setValue(item ? item.period_id : null);
  }

  onChangeSchoolLevelRelation(item: any) {
    this.paramForm.controls['school_location_id'].markAsTouched();
    this.paramForm.controls['school_location_id'].setValue(item ? item.school_location_id : null);

    this.paramForm.controls['school_level_id'].markAsTouched();
    this.paramForm.controls['school_level_id'].setValue(item ? item.school_level_id : null);

    this.selectedSchoolLevel = item ? item.school_level_id : null;

    if (this.paramForm.value.school_level_id) {
      this.getFilteredExculCategoryTotal();
    }
  }

  getFilteredExculCategoryTotal() {
    this.loading = true;
    this.hasData = false;
    this.exculService.getTotalExculCategory({
      academic_year: this.paramForm.value.academic_year || null,
      school_location_id: this.paramForm.value.school_location_id || null,
    })
        .subscribe(
            (response: Extracurricular[]) => {
              // @ts-ignore
              if (response['error'] === 0) {
                // @ts-ignore
                this.dataExcul = response['result'].slice();

                this.hasData = this.dataExcul.length > 0;
                const categoryList = this.dataExcul.map((i: any) => i.category_name);
                const exculTotal = this.dataExcul.map((i: any) => i.total_excul);
                this.chartOptions.series = exculTotal;
                this.chartOptions.labels = categoryList;
                // };
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


