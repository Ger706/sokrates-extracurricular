import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { ProductComponent } from './dashboard-admin/dashboard-admin-components/product/product.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { FullComponent } from './layouts/full/full.component';
import {UnauthenticatedGuard} from "../shared/guard/unauthenticated.guard";
import {BlankComponent} from "./layouts/blank/blank.component";
import {LoginComponent} from "./authentication/side-login/login.component";
import {AuthComponent} from "./authentication/auth.component";

const routes: Routes = [
  {
    path:"layout",
    component:FullComponent,
    children: [
      {path:"", redirectTo:"home", pathMatch:"full"},
      {path:"home", component:DashboardAdminComponent},
      {path:"alerts", component:AlertsComponent},
      {path:"forms", component:FormsComponent},
      {path:"table", component:ProductComponent},
      {path:"grid-list", component:GridListComponent},
      {path:"menu", component:MenuComponent},
      {path:"tabs", component:TabsComponent},
      {path:"expansion", component:ExpansionComponent},
      {path:"chips", component:ChipsComponent},
      {path:"progress", component:ProgressComponent},
      {path:"toolbar", component:ToolbarComponent},
      {path:"progress-snipper", component:ProgressSnipperComponent},
      {path:"snackbar", component:SnackbarComponent},
      {path:"slider", component:SliderComponent},
      {path:"slide-toggle", component:SlideToggleComponent},
      {path:"tooltip", component:TooltipsComponent},
      {path:"button", component:ButtonsComponent},
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {path:"", redirectTo:"login", pathMatch:"full"},
      {path:"login", component:AuthComponent},
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];

// children: [
//   {
//     path: '',
//     redirectTo: 'auth',
//     pathMatch: 'full'
//   },
//   {
//     path: 'auth',
//     loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule),
//     canActivate: [UnauthenticatedGuard]
//   },
//   {
//     path: 'dashboard-admin',
//     loadChildren: () => import('./dashboard-admin/dashboard-admin.module').then(m => m.DashboardAdminModule),
//     canActivate: [UnauthenticatedGuard]
//   },
//   {
//     path: '**',
//     redirectTo: 'client'
//   }
// ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
