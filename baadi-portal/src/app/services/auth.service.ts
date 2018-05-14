import { environment } from './../../environments/environment';
import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  emaiLoginUrl = environment.apiBaseUrl + 'authenticate';
  refreshTokenUrl = environment.apiBaseUrl + 'refresh_token';
  timerId: any;

  // Flag to denote if an user is authenticated
  public _isAuthenticated: boolean;
  private _timeoutHandle;

  constructor(private http: Http, private router: Router) {
  }

  getNewToken() {
    const oldToken = localStorage.getItem('access_token');
    if (oldToken) {
      return this.http.post(this.refreshTokenUrl, { token: oldToken }).map(res => res.json());
    }
  }

  refreshToken(continueInterval = true) {
    // Recursively refresh access token at specified intervals
    if (continueInterval) {
      // tslint:disable-next-line:no-shadowed-variable
      // this.timerId = setTimeout(function tick(auth: AuthService) {
      //   console.log(this);
      //   this.getNewToken().subscribe(data => {
      //     if (data && data.status === 'SUCCESS') {
      //       localStorage.setItem('access_token', data.token);
      //     }
      //   });

      //   this.timerId = setTimeout(tick(auth), 5000);
      // }, 5000);
      this.timerId = setInterval(() => {
        this.getNewToken().subscribe(data => {
          if (data && data.status === 'SUCCESS') {
            localStorage.setItem('access_token', data.token);
            console.log('Token Refreshed');
          }
        });
      }, 5000);
    } else {
      clearInterval(this.timerId);
    }
  }

  /**
   * Email based login system
   * @param credentials - Username and Password
   */
  emailLogin(credentials) {
    return this.http.post(this.emaiLoginUrl, credentials)
      .map(res => res.json());
  }

  logout() {
    // Stop the refresh token timer
    this.refreshToken(false);
  }

  // checkToken() {
  //   this.getNewToken().subscribe(data => {
  //     if (data && data.status === 'SUCCESS') {
  //       localStorage.setItem('access_token', data.token);
  //       console.log('Token Refreshed');
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  // }

  /**
   * Save generated JWT token in localstorage
   * @param response
   */
  saveToken(response) {
    this._isAuthenticated = true;
    localStorage.setItem('access_token', response.token);

    // Store other information about the user
    localStorage.setItem('__userinfo_user_id', response.user_id);
    localStorage.setItem('__userinfo_name', (response.first_name || '') + (response.last_name || ''));
    localStorage.setItem('__userinfo_short_name', response.last_name || '');
    localStorage.setItem('__userinfo_email_id', response.email_id);
    localStorage.setItem('__userinfo_role', response.user_role);
  }

  fetchToken() {
    return localStorage.getItem('access_token');
  }
}
