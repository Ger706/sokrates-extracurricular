import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {
  MatTableDataSource
} from "@angular/material/table";
import {ExtracurricularRuleService} from "../../../shared/services/extracurricular-rule.service";
import {ExtracurricularRule} from "../../../shared/models/extracurricular-rule.model";
import {ToastrService} from "ngx-toastr";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {AcademicYear} from "../../../shared/models/academic-year.model";
import {AcademicCalendarService} from "../../../shared/services/academic-calendar.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-rules',
  styleUrls: ['./rules.component.scss'],
  templateUrl: './rules.component.html',
})
export class RulesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('viewRule', {static: true}) public modalViewRule: NgbModalRef;
  @ViewChild('addRule', {static: true}) public modalAddRule: NgbModalRef;
  @ViewChild('editRule', {static: true}) public modalEditRule: NgbModalRef;
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
  newRuleForm: FormGroup;
  editRuleForm: FormGroup;
  checkApiRun: Subscription;
  disableButtonAdd = true;
  constructor(private ruleService: ExtracurricularRuleService,
              private toastr: ToastrService,
              private academicService: AcademicCalendarService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.initForm();
    this.trackFormChanges();
  }

  initForm() {
    this.paramForm = new FormGroup({
      'school_location_id': new FormControl(null),
    });

    this.newRuleForm = new FormGroup({
      'rule_name': new FormControl(null),
      'rule_description': new FormControl(null),
      'year_level_id': new FormControl([]),
      'school_location_id': new FormControl(null),
      'school_level_id': new FormControl(null),
    })

    this.editRuleForm = new FormGroup({
      'rule_name': new FormControl(null),
      'rule_description': new FormControl(null),
      'year_level_id': new FormControl([]),
      'school_location_id': new FormControl(null),
      'school_level_id': new FormControl(null),
    })
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
  trackFormChanges() {
    this.newRuleForm.valueChanges.subscribe(() => {
      this.disableButtonAdd =
          !this.newRuleForm.get('rule_name')?.value ||
          !this.newRuleForm.get('rule_description')?.value ||
          !this.newRuleForm.get('school_location_id')?.value ||
          !this.newRuleForm.get('year_level_id')?.value
    });
  }
  onChangeSchoolLevel(item: any, isAdd = false) {

    if (!isAdd) {
      this.paramForm.controls['school_location_id'].markAsTouched();
      this.paramForm.controls['school_location_id'].setValue(item ? item.school_location_id : null);
      this.getRuleData();
    } else {
      this.newRuleForm.controls['school_location_id'].markAsTouched();
      this.newRuleForm.controls['school_location_id'].setValue(item ? item.school_location_id : null);

      this.newRuleForm.controls['school_level_id'].markAsTouched();
      this.newRuleForm.controls['school_level_id'].setValue(item ? item.school_level_id : null);

      this.newRuleForm.controls['year_level_id'].setValue(null);
    }

  }
  onChangeYearLevel(item: any) {
    if (!item) {
      return;
    }
    this.newRuleForm.controls['year_level_id'].markAsTouched();
    const data = item.map((i: { year_level_id: any; }) => i.year_level_id);
    this.newRuleForm.controls['year_level_id'].setValue(data.length > 0 ? data : null);
  }
  onChangePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;

    this.getRuleData();
  }
  getRuleData () {
    this.loading = true;
    if (this.checkApiRun) {
      this.checkApiRun.unsubscribe();
    }
    this.checkApiRun = this.ruleService.getFilteredRule({
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

  getRuleDetail(id: number, isEdit = false) {
    this.ruleService.getRule(id)
        .subscribe(
            (response: ExtracurricularRule) => {
              // @ts-ignore
              if (response['error'] === 0) {
                // @ts-ignore
                const data = response['result']['data'];
                this.detailData = data;
                if (isEdit) {
                  this.editRuleForm.patchValue({
                    rule_description: data.rule_description,
                    school_location_id: data.school_location.school_location_id,
                    year_level_id: data.year_level.map((i: { year_level: any; })=> i.year_level)
                  });
                }
                console.log(this.editRuleForm.value);
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
    this.modalService.open(this.modalAddRule, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      size: 'lg'
    }).result.then((result: any) => {

    }, (reason: any) => {

    });
  }
  onOpenModelEditRule (data: any) {
    this.modalService.open(this.modalEditRule, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      size: 'lg'
    }).result.then((result: any) => {

    }, (reason: any) => {

    });
    this.getRuleDetail(data.rule_id, true);


  }
  onAddRule() {
    console.log(this.newRuleForm.value);
  }
  onEditRule() {
    console.log(this.editRuleForm.value);
  }
}
