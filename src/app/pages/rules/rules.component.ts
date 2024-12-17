import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCard, MatCardContent} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {ExtracurricularRuleService} from "../../../shared/services/extracurricular-rule.service";
import {ExtracurricularRule} from "../../../shared/models/extracurricular-rule.model";
import {ToastrService} from "ngx-toastr";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgxPaginationModule} from "ngx-pagination";
import {
  SelectAcademicYearOnlyModule
} from "../../../shared/modules/select-academic-year-only/select-academic-year-only.module";
import {SelectSchoolModule} from "../../../shared/modules/select-school/select-school.module";
import {
  SelectSchoolLevelRelationV2Module
} from "../../../shared/modules/select-school-level-relation-v2/select-school-level-relation-v2.module";
import {NgForOf, NgIf} from "@angular/common";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {AcademicYear} from "../../../shared/models/academic-year.model";
import {AcademicCalendarService} from "../../../shared/services/academic-calendar.service";
import {SelectSchoolActivityModule} from "../../../shared/modules/select-school-activity/select-school-activity.module";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatCheckboxModule, MatRadioModule, MatButtonModule, MatCard, MatCardContent, MatTable, MatColumnDef, MatHeaderCell, MatCell, FaIconComponent, NgxDatatableModule, MatHeaderRow, NgxPaginationModule, MatRow, SelectAcademicYearOnlyModule, SelectSchoolModule, SelectSchoolLevelRelationV2Module, NgIf, MatHeaderRowDef, MatRowDef, MatHeaderCellDef, MatCellDef, NgForOf, MatPaginator, SelectSchoolActivityModule],
  styleUrls: ['./rules.component.scss'],
  templateUrl: './rules.component.html',
})
export class RulesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('viewRule', {static: true}) public modalViewRule: NgbModalRef;
  checked = true;
  heading = "Rules";
  loading = false;
  paramForm: FormGroup;
  currentPage = 1;
  pageLimit = 10;
  dataRules: MatTableDataSource<any>;
  total = 0;
  currentAcademic = null;
  hasData = false;
  detailData: any;
  columnsToDisplay = ['rule_description','school_location', 'year_level', 'selection', 'status', 'action'];
  constructor(private ruleService: ExtracurricularRuleService,
              private toastr: ToastrService,
              private academicService: AcademicCalendarService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.paramForm = new FormGroup({
      'school_location_id': new FormControl(null),
    });
    this.getCurrentAcademicYear();
  }

  getCurrentAcademicYear() {
    this.academicService.getAcademicYearsOnlyCurrent()
        .subscribe((response: AcademicYear) => {
          // @ts-ignore
          if (response['error'] === 0) {
            // @ts-ignore
            this.currentAcademic = new AcademicYear().deserialize(response['result']['data']);
          } else {

          }
        }, (error: any) => {
        });
  }
  ngAfterViewInit() {
    this.dataRules.paginator = this.paginator;
  }
  onChangeSchoolLevel(item: any) {
    this.paramForm.controls['school_location_id'].markAsTouched();
    this.paramForm.controls['school_location_id'].setValue(item ? item.school_id : null);
    this.getRuleData();
  }
  onChangePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;

    this.getRuleData();
  }
  getRuleData () {
    this.loading = true;
    this.ruleService.getFilteredRule({
      school_location_id: this.paramForm.get('school_location_id')?.value,
      page: this.currentPage,
      pagination: true,
      active: null,
    })
        .subscribe(
            (response: ExtracurricularRule) => {
              // @ts-ignore
              if (response['error'] === 0) {
                // @ts-ignore
                this.dataRules = response['result']['data'].slice();
                console.log(this.dataRules);
                // @ts-ignore
                this.total = response['result']['meta']['pagination']['total'];
                this.hasData = this.total > 0;
                this.loading = false;
              } else {
                // @ts-ignore
                this.toastr.error('[' + this.heading + '] ' + response['message'], 'Invalid Response');
              }
            },
            error => {
              this.toastr.error('[' + this.heading + '] Cannot access server endpoint!', 'Connection Error');
            });
  }
  onOpenModalViewRule (data: any) {
    this.modalService.open(this.modalViewRule, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      size: 'lg'
    }).result.then((result: any) => {
    }, (reason: any) => {

    });
    console.log(data);
    this.getRuleDetail(data.rule_id);

  }

  getRuleDetail(id: number) {
    this.ruleService.getRule(id)
        .subscribe(
            (response: ExtracurricularRule) => {
              // @ts-ignore
              if (response['error'] === 0) {
                // @ts-ignore
                this.detailData = response['result']['data'];

              } else {
                // @ts-ignore
                this.toastr.error('[' + this.heading + '] ' + response['message'], 'Invalid Response');
              }
            },
            error => {
              this.toastr.error('[' + this.heading + '] Cannot access server endpoint!', 'Connection Error');
            });
  }
  onOpenModelAddRule () {
    // this.modalService.open(this.modalAddCategory, {
    //   ariaLabelledBy: 'modal-basic-title',
    //   keyboard: false,
    //   size: 'lg'
    // }).result.then((result: any) => {
    //
    // }, (reason: any) => {
    //
    // });
  }

}
