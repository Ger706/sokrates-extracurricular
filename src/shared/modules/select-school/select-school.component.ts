import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from "rxjs";
import { SettingService } from "../../services/setting.service";
import { SchoolAndLocationService } from "../../services/school-and-location.service";
import { School } from "../../models/school.model";
import {YearLevelMapping} from "../../models/year-level-mapping.model";

@Component({
  selector: 'app-select-school',
  templateUrl: './select-school.component.html',
  styleUrls: ['./select-school.component.css']
})
export class SelectSchoolComponent implements OnInit, OnChanges {

  @Output() schoolChanged = new EventEmitter<School>();

  schoolValue: number | null = null;
  @Input() all: boolean = false;
  @Input() approverSetupModule: string | null = null;
  @Input() isDisabled: boolean = false;
  @Input()
  usingLocalStorage = true;

  @Input() academic_year = null;
  placeholder = "";
  heading: string = 'School Selector';
  schools: School[] = [];
  subscription!: Subscription;
  currentPage = 1;
  total: number = 0;
  loading: boolean = false;
  schoolId: number | null = null;

  constructor(
      private toastr: ToastrService,
      private settings: SettingService,
      private salService: SchoolAndLocationService
  ) {}

  ngOnInit() {

  }
  async ngOnChanges(changes: any): Promise<void> {

    if (!this.academic_year) {
      if (this.all) {
        return;
      }
    }

    await this.getSchools();
  }

    async getSchools() {
    this.schoolId = Number(this.settings.getConfig('schoolID')) || null;
    this.subscription = this.salService.schoolChanged.subscribe(
        (schools: School[]) => {
          this.schools = schools;
        }
    );

    this.salService.getSchools().subscribe(
        (response: any) => {
          if (response.error === 0) {
            this.schools = response.result.data.slice();
            const storedSchoolId = Number(this.settings.getConfig('schoolID'));

            if (storedSchoolId) {
              const preselectedSchool = this.schools.find(
                  (school) => school.school_id === storedSchoolId
              );

              if (preselectedSchool) {
                // @ts-ignore
                this.schoolValue = preselectedSchool.school_id;
                this.schoolChanged.emit(preselectedSchool);
              }
            }
          } else {
            this.toastr.error(`[${this.heading}] ${response.message}`, 'Invalid Response');
          }
        },
        (error) => {
          this.toastr.error(`[${this.heading}] Cannot access server endpoint!`, 'Connection Error');
        }
    );
  }
  onChange(event: any) {
    this.schoolId = event ? event.school_id : null;
    // @ts-ignore
    this.settings.setConfig('schoolID', this.schoolId ? String(this.schoolId) : null);
    console.log(event);
    this.schoolChanged.emit(event);
  }
}
