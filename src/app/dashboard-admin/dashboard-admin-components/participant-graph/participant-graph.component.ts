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
  ApexGrid
} from 'ng-apexcharts';
import {FormControl, FormGroup} from "@angular/forms";
import {Extracurricular} from "../../../../shared/models/extracurricular.model";
import {ExtracurricularService} from "../../../../shared/services/extracurricular.service";
import {TranslateService} from "../../../../shared/services/translate.service";


export interface exculParticipant {
  series: ApexAxisChartSeries;
  dataLabels: ApexDataLabels;
  chart: ApexChart;
  legend: ApexLegend;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
}


@Component({
  selector: 'app-participant-graph',
  templateUrl: './participant-graph.component.html',
  styleUrls: ['./participant-graph.component.scss'],

})
export class ParticipantGraphComponent implements OnInit{

  @ViewChild("activeusercardchart") chart1: ChartComponent = Object.create(null);
  public exculParticipant !: Partial<exculParticipant> | any;

  constructor(private exculService : ExtracurricularService, private translate: TranslateService, private cd: ChangeDetectorRef) {

    translate.load('main', 'extracurricular');
    // active users
    this.exculParticipant = {

      chart: {
        toolbar: {
          show: false,
        },
        type: 'bar',
        height: 300,

      },
      legend: {
        show: false,
      },

      tooltip: {
        theme: "dark"
      },

      grid: {
        show: true,
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 5,
        colors: ['none']
      },
    }
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
      this.getFilteredExcul();
    }
  }

  getFilteredExcul() {
    this.loading = true;
    this.hasData = false;

    this.exculService.getFilteredExculParticipant({
      name: this.paramForm.value.name || null,
      academic_year: this.paramForm.value.academic_year || null,
      period_id: this.paramForm.value.period_id || null,
      school_location_id: this.paramForm.value.school_location_id || null,
      school_level_id: this.paramForm.value.school_level_id || null,
      year_level_id: this.paramForm.value.year_level_id || null,
      school_level_relation_id: this.paramForm.value.school_level_relation_id || null,
      paginate: true,
      task: 'EXTRACURRICULAR_PARTICIPANT_VIEW',
    }).subscribe(
        (response: Extracurricular[]) => {
          // @ts-ignore
          if (response['error'] === 0) {
            // @ts-ignore
            this.dataExcul = response['result']['data'].slice();
            this.hasData = this.dataExcul.length > 0;
            const participantAmount = this.dataExcul.map((i: any) => i.participant_count);
            const extracurricularName = this.dataExcul.map((i: any) => i.extracurricular_name);

            this.exculParticipant.series = [
              {
                name: 'Participant Amount',
                data: participantAmount,
              }
            ];
            this.exculParticipant.xaxis = {
              categories: extracurricularName,
            };

            this.exculParticipant.plotOptions = {
              bar: {
                columnWidth: '45%',
                    borderRadius: 5,
                    distributed: true,
              },
            };

            this.loading = false;
          } else {
            this.loading = false;
          }
        },
        (error) => {
          this.loading = false;
        }
    );
  }
}
