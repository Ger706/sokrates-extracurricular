import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {CommonModule} from '@angular/common';
import {UserService} from '../../shared/services/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgOtpInputModule} from 'ng-otp-input';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule,
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgOtpInputModule,
      FontAwesomeModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AuthComponent]
})
export class AuthModule {
}
