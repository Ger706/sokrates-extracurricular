import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MaterialModule} from "../../../shared/modules/material.module";


@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss'],
  standalone: true,
  imports: [RouterOutlet, MaterialModule, CommonModule],
})
export class BlankComponent {
  constructor() {}
}
