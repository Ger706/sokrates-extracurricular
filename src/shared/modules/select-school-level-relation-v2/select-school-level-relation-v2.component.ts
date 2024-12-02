import {Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {SettingService} from "../../services/setting.service";
import {AuthService} from "../../services/auth.service";
import {YearLevelMapping} from "../../models/year-level-mapping.model";
import {YearLevelMappingService} from "../../services/year-level-mapping.service";
import {TranslateService} from "../../services/translate.service";

@Component({
  selector: 'app-select-school-level-relation-v2',
  templateUrl: './select-school-level-relation-v2.component.html',
  styleUrls: ['./select-school-level-relation-v2.component.css']
})
export class SelectSchoolLevelRelationV2Component implements OnInit, OnChanges {

  localStorageName = 'client.asslr';
  heading = 'School Level Select Relation';
  // @ts-ignore
  schoolLevelRelationValue: YearLevelMapping | null = null;
  schoolLevelRelations: YearLevelMapping[] = [];
  schoolLevelRelationsFiltered: YearLevelMapping[] = [];
  schoolLevelRelationsWithAll = [];
  loading: boolean | undefined;
  changes: any;
  schoolLevelUser: any;
  text = false;
  str = null;
  schoolLocationTemporaryOne = [];
  schoolLocationTemporaryTwo = [];


  @Output()
  schoolLevelRelationChanged = new EventEmitter<YearLevelMapping>();

  @Output()
  open = new EventEmitter<any>();

  @Input()
  all = false;

  @Input()
  task: string | null = null;

  @Input()
  academic_year : string | null = null;

  @Input()
  period_setup_id = null;

  @Input()
  period_id = null;

  @Input()
  angkatan = null;

  @Input()
  school_level_id = null;

  @Input()
  school_location_id = null;

  @Input()
  approver_setup_module = null;

  @Input()
  isDisabled: boolean = false;

  @Input()
  multiple: boolean = false;

  @Input()
  addAllToList: boolean = false;

  @Input()
  usingLocalStorage = true;

  @Input()
  usingUserAccess = true;

  @Input()
  school_location_ids = null;

  @Input()
  location = false;

  @Input()
  isFilterLocationByData = false;

  @Input()
  filterLocationByData = [];

  @Input()
  isApprover = false;

  constructor(private ylmService: YearLevelMappingService,
              private toastr: ToastrService,
              private injector: Injector,
              private setting: SettingService,
              private auth: AuthService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    if (this.location === true) {
      this.text = true;
    }
    this.translate.load('main', 'extracurricular/excul-participant');
  }

  async getUserAccess() {
    this.schoolLevelUser = null;
    if (this.usingUserAccess) {
      const access = this.auth.current()['access'];
      if (access) {
        this.schoolLevelUser = access['school_level'];
      }
    }
  }

  onChange(item: any) {
    if (!this.schoolLevelRelationValue) {
      this.schoolLevelRelationValue = null;
      // @ts-ignore
      this.schoolLevelRelationChanged.emit(null);
      return;
    }

    this.schoolLevelRelationChanged.emit(this.schoolLevelRelationValue);
    this.onSaveLocalStorage();
  }

  async ngOnChanges(changes: any): Promise<void> {

    this.schoolLevelRelationValue = null;
    this.schoolLevelRelations = [];
    this.schoolLevelRelationsFiltered = [];

    if (!this.academic_year && !this.period_id) {
      if (this.all) {
        return;
      }
    }

    await this.getUserAccess();
    await this.getYearLevelMapping();
    this.changes = changes;
  }

  async getYearLevelMapping() {
    if (this.isDisabled) {
      return;
    }

    this.loading = true;
    this.ylmService.filteredRolesV2({
      academic_year: this.academic_year,
      period_id: this.period_id,
      angkatan: this.angkatan,
      school_location_id: this.school_location_id,
      school_level_id: this.school_level_id,
      school_location_ids: this.school_location_ids,
      task: this.task,
      approver_setup_module: this.approver_setup_module,
    })
      .subscribe((response: YearLevelMapping) => {
        // @ts-ignore
        if (response['error'] === 0) {
          // @ts-ignore
          this.schoolLevelRelations = response['result']['data'];
          if (this.schoolLevelUser) {
            // @ts-ignore
            this.schoolLevelRelations = this.schoolLevelRelations.filter(x => this.schoolLevelUser.map(y => y).includes(x.school_level_id));
          }
          this.filterSchoolLevelRelations();

          if (this.schoolLevelRelationsFiltered) {
            this.onCheckLocalStorage();
          }


          // if (this.isFilterLocationByData === true && this.isApprover === true && this.schoolLocationTemporaryOne.length == 0) {

          //   this.filterLocationByData = this.filterLocationByData.map(function(i) {
          //     return i.school_location_id;
          //   });

          //   this.filterLocationByData = this.filterLocationByData.filter(this.onlyUnique);
          //   this.filterLocation(this.filterLocationByData, this.schoolLevelRelationsFiltered);
          // }

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

  // filterLocation(item, schoolLevelFilter) {
  //     const a = [];

  //     for (let i = item.length - 1; i >= 0; i--) {
  //         const c = schoolLevelFilter.filter(function(z) {
  //             return z.school_location_id === item[i];
  //         })[0];

  //         a.push(c);
  //     }
  //     this.schoolLocationTemporaryOne = a;
  //     if (this.schoolLocationTemporaryTwo.length == 0) {
  //         this.schoolLocationTemporaryTwo = this.schoolLocationTemporaryOne;
  //         this.schoolLevelRelationsFiltered = this.schoolLocationTemporaryTwo;
  //     }
  // }



  onlyUnique(value: any, index: any, self: string | any[]) {
    return self.indexOf(value) === index;
  }

  filterSchoolLevelRelations() {
    // assign school level relation of unique school_id && school_level_id && school_short_address
    const helper: { [key: string]: YearLevelMapping } = {};
    // @ts-ignore
    this.schoolLevelRelationsFiltered = this.schoolLevelRelations
      .reduce(function (r, o) {
        const key = o.school_id + '-' + o.school_level_id + '-' + o.school_short_address;
        if (!helper[key]) {
          helper[key] = Object.assign({}, o);
          // @ts-ignore
          r.push(helper[key]);
        } else {
          helper[key].used += o['used'];
          helper[key].instances += o['instances'];
        }
        return r;
      }, []);
    if (this.addAllToList === true) {
      // @ts-ignore
      this.schoolLevelRelationsWithAll = this.schoolLevelRelationsFiltered;
      // @ts-ignore
      this.schoolLevelRelationsWithAll.push({
        instances: NaN,
        order_number: 0,
        school_address: null,
        school_level_id: -1,
        school_level_name: 'All',
        school_short_address: 'All',
        school_level_relation_id: null,
        school_location_id: null,
        school_name: null,
        used: NaN,
      });
      this.schoolLevelRelationsFiltered = this.schoolLevelRelationsWithAll;
    }
    this.findSchoolLevelRelationValue();
  }

  findSchoolLevelRelationValue() {
    if (this.school_level_id || this.school_location_id || this.schoolLevelRelations) {
      // @ts-ignore
      this.schoolLevelRelationValue = this.schoolLevelRelations
        .find(i => i.school_level_id === this.school_level_id || i.school_location_id === this.school_location_id);
      // @ts-ignore
      this.schoolLevelRelationChanged.emit(this.schoolLevelRelationValue);
    }
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
    if (val) {
      // @ts-ignore
      this.schoolLevelRelationValue = this.schoolLevelRelationsFiltered
        .find(i => i.school_level_id === val.school_level_id && i.school_location_id === val.school_location_id);
      if (this.schoolLevelRelationValue) {
        this.schoolLevelRelationChanged.emit(this.schoolLevelRelationValue);
      }
    }
  }

  onSaveLocalStorage() {
    if (!this.usingLocalStorage) {
      return;
    }
    this.setting.setConfig(this.localStorageName, JSON.stringify(this.schoolLevelRelationValue));
  }

  onOpen() {
    if (this.schoolLevelRelationValue) {
      const keys = Object.keys(this.schoolLevelRelationValue);
      this.open.emit(keys);
    }
  }

}
