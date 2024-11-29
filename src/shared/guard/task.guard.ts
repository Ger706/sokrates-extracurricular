import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    authService.loadPermissions();
  }

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {

    const tasksOwned = this.authService.permissions;

    const tasksRequired = activatedRouteSnapshot.data['tasks'];

    let isAllowed = false;

    for (const task of tasksRequired) {
      if (tasksOwned[task]) {
        isAllowed = true;
        break;
      }
    }

    if (!isAllowed) {
      this.router.navigate(['not-authorized']);
    }

    return isAllowed;
  }
}
