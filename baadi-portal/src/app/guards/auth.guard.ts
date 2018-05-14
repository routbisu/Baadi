import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route, state: RouterStateSnapshot) {
    if (localStorage.getItem('access_token')) {
      return this.auth.getNewToken().map(data => {
        if (data && data.status === 'SUCCESS') {
          localStorage.setItem('access_token', data.token);
          console.log('Token Refreshed');
          return true;
        }
      });
    }

    // Return the user the login page
    localStorage.setItem('__returnUrl', state.url);
    this.router.navigateByUrl('/login');
  }
}
