import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Extracurricular} from "../../models/extracurricular.model";
import {ExtracurricularService} from "../../services/extracurricular.service";

@Component({
  selector: 'app-select-excul',
  templateUrl: './select-excul.component.html',
  styleUrls: ['./select-excul.component.css']
})
export class SelectExculComponent implements OnInit, OnChanges {

  heading = 'Excul Select';
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

  constructor(
    private exculService: ExtracurricularService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    // this.exculService.getAllDropdownExcul({
    //   academic_year: this.academic_year,
    //   school_location_id: this.school_location_id,
    //   school_level_id: this.school_level_id,
    // })
    //   .subscribe((response: ExtracurricularExcul[]) => {
    //     if (response['error'] === 0) {
    //       console.warn(response);
    //       this.exculList = response['result']['data'].slice();
    //     } else {
    //       this.toastr.error('[' + this.heading + '] ' + response['message'], 'Invalid Response');
    //     }
    //   }, error => {
    //     this.toastr.error('[' + this.heading + '] Cannot access server endpoint!', 'Connection Error');
    //   });
  }

  ngOnChanges(changes: any): void {
    if (this.academic_year && (changes.academic_year || changes.school_level_id || changes.school_location_id || changes.year_level_id)) {
      // @ts-ignore
      this.exculValue = null;
      this.getExtracurriculars();
    }
  }

  onChange(item: any) {

    if (!item) {
      // @ts-ignore
      this.exculChanged.emit(null);
      return;
    }

    this.exculChanged.emit(this.exculValue);
  }

  getExtracurriculars() {
    this.exculService.getAllDropdownExcul({
      academic_year: this.academic_year,
      school_location_id: this.school_location_id,
      school_level_id: this.school_level_id,
      year_level_id: this.year_level_id,
    })
      .subscribe((response: Extracurricular[]) => {
        // @ts-ignore
        if (response['error'] === 0) {
          console.warn(response);
          // @ts-ignore
          this.exculList = response['result'].slice();
        } else {
          // @ts-ignore
          this.toastr.error('[' + this.heading + '] ' + response['message'], 'Invalid Response');
        }
      }, error => {
        this.toastr.error('[' + this.heading + '] Cannot access server endpoint!', 'Connection Error');
      });
  }
}
