import { environment } from './../../environments/environment';
import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  emaiLoginUrl = environment.apiBaseUrl + 'authenticate';

  // Flag to denote if an user is authenticated
  public _isAuthenticated: boolean;
  private _timeoutHandle;

  constructor(private http: Http) {
    this.refreshToken();
  }

  refreshToken(continueInterval = true) {
    // Recursively refresh access token at specified intervals
    let timerId = setTimeout(function tick() {
      console.log('Timer ran');
      timerId = setTimeout(tick, 2000);
    }, 2000);
  }

  /**
   * Email based login system
   * @param credentials - Username and Password
   */
  emailLogin(credentials) {
    return this.http.post(this.emaiLoginUrl, credentials)
      .map(res => res.json());
  }

  checkToken() {

  }

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
