import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route, state: RouterStateSnapshot) {
    // If user is authenticated and the tab has not been closed yet
    if (this.auth._isAuthenticated) { console.log('Already logged in'); return true; }

    // If user had logged in but has closed the browser and has come back to access
    // portal before expiration of the Grace period
    if (localStorage.getItem('access_token')) {
      return this.auth.getNewToken().map(data => {
        if (data && data.status === 'SUCCESS') {
          localStorage.setItem('access_token', data.token);
          console.log('Token Refreshed');
          return true;
        } else {
          // If the token refresh grace period is expired
          localStorage.setItem('__returnUrl', state.url);
          this.router.navigateByUrl('/login');
          return false;
        }
      });
    }

    // If user has logged out
    // Return the user the login page
    localStorage.setItem('__returnUrl', state.url);
    this.router.navigateByUrl('/login');
    return false;
  }
}
