import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Extracurricular} from "../../models/extracurricular.model";
import {ExtracurricularService} from "../../services/extracurricular.service";
import {SettingService} from "../../services/setting.service";
import {ExtracurricularCategory} from "../../models/extracurricular-category.model";
import {ExtracurricularCategoryService} from "../../services/extracurricular-category.service";
import {TranslateService} from "../../services/translate.service";
import {SchoolActivityModel} from "../../models/school-activity-model";

@Component({
  selector: 'app-select-school-activity',
  templateUrl: './select-school-activity.component.html',
  styleUrls: ['./select-school-activity.component.css']
})
export class SelectSchoolActivityComponent implements OnInit, OnChanges {

  heading = 'School Activity Select';
  loading: boolean;
  schoolActivityValue: SchoolActivityModel;
  schoolActivityList: SchoolActivityModel[] = [];

  @Output()
  schoolActivityChanged = new EventEmitter<SchoolActivityModel>();

  @Input()
  isDisabled = false;

  schoolActivityData :any = [];
  constructor(
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.translate.load('main', 'extracurricular');
    this.getSchoolActivities();
  }

  ngOnChanges(changes: any): void {
      // @ts-ignore
      this.schoolActivityValue = null;
      this.getSchoolActivities();
  }

  onChange(item: any) {
    if (!item) {
      // @ts-ignore
      this.schoolActivityChanged.emit(null);
      return;
    }
    this.schoolActivityChanged.emit(item);
  }

  getSchoolActivities() {
    this.schoolActivityData = [
      {
        "school_activity_id": 1,
        "school_activity_name": "Extracurricular",
        "description": "Activities conducted outside the regular academic curriculum, like sports and arts."
      },
      {
        "school_activity_id": 2,
        "school_activity_name": "Intracurricular",
        "description": "Activities integrated into the academic curriculum, like laboratory sessions and workshops."
      },
      {
        "school_activity_id": 3,
        "school_activity_name": "Lomba",
        "description": "Competitions organized to encourage participation in various skills and fields."
      },
      {
        "school_activity_id": 4,
        "school_activity_name": "Olimpiade",
        "description": "Olympiads or academic competitions focused on specific subjects like math and science."
      },
      {
        "school_activity_id": 4,
        "school_activity_name": "Courses",
        "description": "Yes this is a course, cry about it",
      }
    ]
  }
}
