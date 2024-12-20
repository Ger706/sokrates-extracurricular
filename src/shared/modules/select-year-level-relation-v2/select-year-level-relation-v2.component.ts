import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import {PathwayMapping} from "../../models/pathway-mapping.model";
import {SettingService} from "../../services/setting.service";
import {AuthService} from "../../services/auth.service";
import {ClassModel} from "../../models/class.model";
import {ClassService} from "../../services/class.service";
import {PathwayMappingService} from "../../services/pathway-mapping.service";


@Component({
  selector: 'app-select-year-level-relation-v2',
  templateUrl: './select-year-level-relation-v2.component.html',
  styleUrls: ['./select-year-level-relation-v2.component.css']
})
export class SelectYearLevelRelationV2Component implements OnInit, OnChanges {

  localStorageName = 'client.asylr';
  heading = 'Year Level Select Relation';
  yearLevelRelationValue: any;
  newVarForPathwayModel: any;
  ids: any;
  staff: any;
  homeroom_teacher: any;
  yearLevelRelationsValue: PathwayMapping[];
  _yearLevelRelations: PathwayMapping[];
  yearLevelRelations: PathwayMapping[];
  yearLevelWithUnllocatedProperty: any;
  loading: boolean;
  yearLevelUser: any;
  classOfTeacherSubject: any;
  class_id: any;
  classValue: any;

  @Output()
  yearLevelRelationChanged = new EventEmitter<PathwayMapping>();

  @Input()
  all = false;

  @Input()
  homeroom_filter = false;

  @Input()
  year_level_ids = [];

  @Input()
  multiple = false;

  @Input()
  academic_year = null;

  @Input()
  period_id = null;

  @Input()
  angkatan = null;

  @Input()
  school_location_id: number;

  @Input()
  school_location_ids: number[];

  @Input()
  school_level_id: number;

  @Input()
  school_level_ids: number[];

  @Input()
  school_level_relation_id: number;

  @Input()
  year_level_id: number;

  @Input()
  pathway_id: number;

  @Input()
  approver_setup_module = null;

  @Input()
  isDisabled: boolean;

  @Input()
  isGroupPathway = true;

  @Input()
  menu: string;

  @Input()
  task: string;

  @Input()
  usingLocalStorage = true;

  @Input()
  showGroupLabel = false;

  @Input()
  usingUserAccess = false;

  @Input()
  withTeacherSubject = true;

  @Input()
  withWaliKelas = true;

  @Input()
  subject_category = null;

  @Input()
  data_teacher_subject: any;

  @Input()
  is_teacher_subject = false;

  @Input()
  allParameterData = false;

  @Input()
  is_graduate_status = false;

  constructor(private pmService: PathwayMappingService,
              private toastr: ToastrService,
              private injector: Injector,
              private setting: SettingService,
              private auth: AuthService,
              private classService: ClassService) {
  }

  ngOnInit() {
  }

  getUserAccess() {
    this.yearLevelUser = null;
    if (this.usingUserAccess) {
      const access = this.auth.current()['access'];
      if (access) {
        this.yearLevelUser = access['year_level'];
      }
    }
  }

  onChange(item: any) {
    if (Number.isNaN(this.newVarForPathwayModel)) {
      // @ts-ignore
      this.yearLevelRelationChanged.emit(null);
      return;
    }
    if (this.multiple && this.allParameterData) {
      if (Array.isArray(item) && item.length === 0) {
        this.yearLevelRelationChanged.emit(this.yearLevelRelations as any);
      } else {
        this.yearLevelRelationChanged.emit(item);
      }
    } else {
      this.yearLevelRelationChanged.emit(item);
    }
    this.yearLevelRelationValue = item;
    this.onSaveLocalStorage();
  }

  ngOnChanges(changes: any): void {
    this.yearLevelRelationValue = null;
    this.yearLevelRelationsValue = [];
    this.yearLevelRelations = [];
    this._yearLevelRelations = [];
    this.newVarForPathwayModel = [];

    if (!this.school_level_relation_id &&
      !this.school_location_id &&
      !this.school_location_ids &&
      !this.school_level_id &&
      !this.school_level_ids) {
      if (this.all) {
        return;
      }
    }

    this.getUserAccess();
    this.getPathwayMappings();

  }

  getHomeroomTeacherPathwayMappings(staff: any) {

    this.pmService.getHomeroomTeacherPathwayMappings(staff.user.id).subscribe((response: any) => {
      if (response['error'] === 0) {
        this.homeroom_teacher = response['result'];

        this.yearLevelRelations = this.yearLevelRelations.filter(i => {
          return i.pathway_id === this.homeroom_teacher[0].pathway_id && i.year_level_id === this.homeroom_teacher[0].year_level_id;
        });
      } else {
        this.loading = false;
        this.toastr.error('[' + this.heading + '] ' + response['message'], 'Invalid Response');
      }
    }, (error: any) => {
      this.loading = false;
      this.toastr.error('[' + this.heading + '] Cannot access server endpoint!', 'Connection Error');
    });
  }

  getPathwayMappings() {
    if (this.isDisabled) {
      return;
    }

    this.loading = true;
    this.pmService.filteredRolesV2({
      academic_year: this.academic_year,
      period_id: this.period_id,
      angkatan: this.angkatan,
      school_level_relation_id: this.school_level_relation_id,
      school_location_id: this.school_location_id,
      school_location_ids: this.school_location_ids,
      school_level_id: this.school_level_id,
      school_level_ids: this.school_level_ids,
      year_level_id: this.year_level_id,
      pathway_id: this.pathway_id,
      task: this.task,
      with_teacher_subject: this.withTeacherSubject,
      with_wali_kelas: this.withWaliKelas,
      approver_setup_module: this.approver_setup_module,
      is_graduate_status: this.is_graduate_status
    })
      .subscribe((response: PathwayMapping) => {
        // @ts-ignore
        if (response['error'] === 0) {
          const helper = {};
          // @ts-ignore
          this._yearLevelRelations = response['result']['data']
            .reduce((r: any, o: any) => {
              let key = o.year_level_id + '-' + o.pathway_id;
              if (!this.isGroupPathway) {
                key = o.year_level_id;
              }

              // @ts-ignore
              if (!helper[key]) {
                // @ts-ignore
                helper[key] = Object.assign({}, o);
                // @ts-ignore
                r.push(helper[key]);
              } else {
                // @ts-ignore
                helper[key].used += o['used'];
                // @ts-ignore
                helper[key].instances += o['instances'];
              }
              return r;
            }, []);


          if (this.showGroupLabel) {
            this._yearLevelRelations.forEach(i => {
              if (i.pathway_name && (i.pathway_name !== 'NONE')) {
                i.year_level_name = i.year_level_name + ' - ' + i.pathway_name;
              }
            });
          }
          if (this.yearLevelUser) {
            this._yearLevelRelations = this._yearLevelRelations.filter(x => this.yearLevelUser.map((y: any) => y).includes(x.year_level_id));
          }
          this.yearLevelRelations = this._yearLevelRelations.slice();
          this.filterYearLevelRelation();
          if (this.year_level_id) {
            this.findYearLevel();
          } else if (this.school_level_relation_id) {
            this.findYearLevelByRelation();
          } else if (this.year_level_ids && this.year_level_ids.length > 0) {
            this.year_level_ids.forEach(j => {
              console.log(this.year_level_ids);
              // @ts-ignore
              // const res = this.yearLevelRelations.find(i => i.year_level_id === j.year_level_id && i.pathway_id === j.pathway_id);
              const res = this.yearLevelRelations.find(i => i.year_level_id === j.year_level_id);
              console.log(res);
              if (res) {
                this.yearLevelRelationsValue.push(res);
              }

            });
            this.yearLevelRelationValue = this.yearLevelRelationsValue.map(v => JSON.stringify(v)).filter((v, i, a) => a.indexOf(v) === i).map(v => JSON.parse(v));
            this.newVarForPathwayModel = this.yearLevelRelationsValue.map(v => v.year_pathway_relation_id).filter((v, i, a) => a.indexOf(v) === i);
            // this.yearLevelRelationValue = [this.yearLevelRelations[0], this.yearLevelRelations[1]];
          }

          if (this.year_level_ids && this.year_level_ids.length > 0) {
            this.yearLevelRelationChanged.emit(this.yearLevelRelationValue);
          } else {
            if (this.yearLevelRelations) {
              this.onCheckLocalStorage();
            }
          }
          // if (this.homeroom_filter === true) {
          //     this.staff = JSON.parse(localStorage.getItem('client.auth'));
          //     if (this.staff.user.id !== 1) {
          //       this.getHomeroomTeacherPathwayMappings(this.staff);
          //     }
          // }
          this.loading = false;

          if (this.is_teacher_subject === true) {
            if (this.newVarForPathwayModel.length === 0) {
              if (this.subject_category === 'CORE') {
                this.newVarForPathwayModel = this.yearLevelRelationValue.year_pathway_relation_id;
              } else {
                this.newVarForPathwayModel = this.yearLevelRelationValue.year_pathway_relation_id;
                // this.getClass();
              }
            }
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

  getClass() {
    this.classService.getClass(this.data_teacher_subject.class_id)
      .subscribe((response: ClassModel) => {
        // @ts-ignore
        if (response['error'] === 0) {
          // @ts-ignore
          this.classValue = response['result']['data'];
          this.pathway_id = this.classValue.pathway_id;
          this.getNewPathwayMapping();
        } else {
          // @ts-ignore
          this.toastr.error('[' + this.heading + '] ' + response['message'], 'Invalid Response');
        }
      }, (error: any) => {
        this.toastr.error('[' + this.heading + '] Cannot access server endpoint!', 'Connection Error');
      });
  }

  getNewPathwayMapping() {
    this.loading = true;
    this.pmService.filteredRoles({
      academic_year: this.academic_year,
      period_id: this.period_id,
      angkatan: this.angkatan,
      school_level_relation_id: this.school_level_relation_id,
      school_location_id: this.school_location_id,
      school_location_ids: this.school_location_ids,
      school_level_id: this.school_level_id,
      school_level_ids: this.school_level_ids,
      year_level_id: this.year_level_id,
      pathway_id: this.pathway_id,
      task: this.task,
      with_teacher_subject: this.withTeacherSubject,
      with_wali_kelas: this.withWaliKelas,
      approver_setup_module: this.approver_setup_module,
    })
      .subscribe((response: PathwayMapping) => {
        // @ts-ignore
        if (response['error'] === 0) {
          // @ts-ignore
          this.yearLevelRelations = response['result']['data'].slice();
          this.newVarForPathwayModel = this.classValue.year_pathway_relation_id;
          this.loading = false;
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


  filterYearLevelRelation() {
    this.yearLevelRelationValue = null;
    if (this.school_level_id && this.school_location_id) {
      this.yearLevelRelations = this._yearLevelRelations
        .filter(i => i.school_level_id === this.school_level_id && i.school_location_id === this.school_location_id);
    }
    if (this.menu === 'student') {
      this.yearLevelWithUnllocatedProperty = this._yearLevelRelations.slice();
      this.yearLevelWithUnllocatedProperty.push({
        pathway_id: null,
        pathway_name: null,
        school_level_id: null,
        school_level_name: null,
        school_level_relation_id: null,
        school_location_id: null,
        school_name: null,
        year_level_id: -1,
        year_level_name: 'Unallocated',
        year_pathway_relation_id: -1,
      });
      this.yearLevelRelations = this.yearLevelWithUnllocatedProperty;
    }
  }

  findYearLevelByRelation() {
    if (this.school_level_relation_id) {
      this.yearLevelRelationValue = this.yearLevelRelations.find(i => i.school_level_relation_id === this.school_level_relation_id);
    }
    this.onChange(this.yearLevelRelationValue);
  }

  findYearLevel() {
    this.yearLevelRelationValue = this.yearLevelRelations.find(i => i.year_level_id === this.year_level_id);
  }

  onCheckLocalStorage() {
    if (!this.localStorageName) {
      return;
    }
    if (!this.usingLocalStorage) {
      return;
    }

    this.loading = false;
    const val = JSON.parse(<string>this.setting.getConfig(this.localStorageName));
    if (this.allParameterData) {
      // @ts-ignore
      this.yearLevelRelationChanged.emit(this.yearLevelRelations);
    }
    if (val) {
      this.yearLevelRelationValue = this.yearLevelRelations
        .find(i => i.year_pathway_relation_id === val.year_pathway_relation_id);
      if (this.yearLevelRelationValue) {
        this.newVarForPathwayModel = this.yearLevelRelationValue.year_pathway_relation_id;
      }

      if (this.allParameterData) {
        // @ts-ignore
        this.yearLevelRelationChanged.emit(this.yearLevelRelations);
      } else {
        this.yearLevelRelationChanged.emit(this.yearLevelRelationValue);
      }
    }
  }

  onSaveLocalStorage() {
    if (!this.usingLocalStorage) {
      return;
    }
    this.setting.setConfig(this.localStorageName, JSON.stringify(this.yearLevelRelationValue));
  }


}
