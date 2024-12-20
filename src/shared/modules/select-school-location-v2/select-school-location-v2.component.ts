import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {SchoolLocation} from "../../models/school-location";
import {SchoolAndLocationService} from "../../services/school-and-location.service";

@Component({
  selector: 'app-select-school-location-v2',
  templateUrl: './select-school-location-v2.component.html',
  styleUrls: ['./select-school-location-v2.component.css']
})
export class SelectSchoolLocationV2Component implements OnInit {

  heading = 'School Location Select';
  schoolLocationValue: SchoolLocation;
  schoolLocations: SchoolLocation[];
  loading: boolean;

  @Output()
  schoolLocationChanged = new EventEmitter<SchoolLocation>();

  @Input()
  all = false;

  @Input()
  school_location_id = null;

  @Input()
  school_location_ids = null;

  @Input()
  task_role = null;

  @Input()
  isDisabled = false;

  constructor(private salService: SchoolAndLocationService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loading = true;
    this.salService.getFilteredSchoolLocationV2({
      school_location_ids: this.school_location_ids,
      task: this.task_role
    })
      .subscribe((response: SchoolLocation) => {
        // @ts-ignore
        if (response['error'] === 0) {
          // @ts-ignore
          this.schoolLocations = response['result']['data'].slice();

          if (this.school_location_id) {
            // @ts-ignore
            this.schoolLocationValue = this.schoolLocations.find(i => i.school_location_id === this.school_location_id);
            this.schoolLocationChanged.emit(this.schoolLocationValue);
          }
          this.loading = false;
        } else {
          this.loading = false;
          // @ts-ignore
          this.toastr.error('[' + this.heading + '] ' + response['message'], 'Invalid Response');
        }
      }, error => {
        this.loading = false;
        this.toastr.error('[' + this.heading + '] Cannot access server endpoint!', 'Connection Error');
      });
  }

  onChange(item: any) {
    if (!item) {
      // @ts-ignore
      this.schoolLocationValue = null;
      // @ts-ignore
      this.schoolLocationChanged.emit(null);
      return;
    }

    this.schoolLocationChanged.emit(this.schoolLocationValue);
  }

}
