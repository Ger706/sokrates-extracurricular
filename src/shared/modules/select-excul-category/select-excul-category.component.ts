import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Extracurricular} from "../../models/extracurricular.model";
import {ExtracurricularService} from "../../services/extracurricular.service";
import {SettingService} from "../../services/setting.service";
import {ExtracurricularCategory} from "../../models/extracurricular-category.model";
import {ExtracurricularCategoryService} from "../../services/extracurricular-category.service";
import {TranslateService} from "../../services/translate.service";

@Component({
  selector: 'app-select-excul-category',
  templateUrl: './select-excul-category.component.html',
  styleUrls: ['./select-excul-category.component.css']
})
export class SelectExculCategoryComponent implements OnInit, OnChanges {

  heading = 'Excul Category Select';
  loading: boolean;
  exculValue: Extracurricular;
  exculList: Extracurricular[] = [];

  @Output()
  exculChanged = new EventEmitter<Extracurricular>();

  @Input()
  all = false;

  @Input()
  excul_id = null;

  @Input()
  academic_year : string | null = null;

  @Input()
  school_location_id = null;

  @Input()
  school_level_id = null;

  @Input()
  year_level_id = null;

  @Input()
  isDisabled = false;

  dataCategory : ExtracurricularCategory[] = [];
  constructor(
    private exculService: ExtracurricularService,
    private toastr: ToastrService,
    private settings: SettingService,
    private categoryService: ExtracurricularCategoryService,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.translate.load('main', 'extracurricular');
    this.getCategories();
  }

  ngOnChanges(changes: any): void {
      // @ts-ignore
      this.exculValue = null;
      this.getCategories();
  }

  onChange(item: any) {
    if (!item) {
      // @ts-ignore
      this.exculChanged.emit(null);
      return;
    }
    this.exculChanged.emit(item);
  }

  getCategories() {
    this.categoryService.getActiveCategories()
      .subscribe((response: ExtracurricularCategory) => {
        // @ts-ignore
        if (response['error'] === 0) {
          // @ts-ignore
          this.dataCategory = response['result']['data'].slice();
        } else {
          // @ts-ignore
          this.toastr.error('[' + this.heading + '] ' + response['message'], 'Invalid Response');
        }
      }, error => {
        this.toastr.error('[' + this.heading + '] Cannot access server endpoint!', 'Connection Error');
      });
  }
}
