import { Routes } from '@angular/router';
import {LoginComponent} from "./side-login/login.component";
export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
