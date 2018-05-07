import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  emaiLoginUrl = environment.apiBaseUrl + 'authenticate';

  constructor(private http: Http) { }

  /**
   * Email based login system
   * @param credentials - Username and Password
   */
  emailLogin(credentials) {
    return this.http.post(this.emaiLoginUrl, credentials)
      .map(res => res.json());
  }

  /**
   * Save generated JWT token in localstorage
   * @param response 
   */
  saveToken(response) {
    localStorage.setItem('access_token', response.token);
  
    // Store other information about the user
    const _user = response.user
    if (_user) {
      localStorage.setItem('__userinfo_id', _user._id);
      localStorage.setItem('__userinfo_name', (_user.FirstName || '') + (_user.LastName || ''));
      localStorage.setItem('__userinfo_short_name', _user.LastName || '');
      localStorage.setItem('__userinfo_email_id', _user.EmailId);
      localStorage.setItem('__userinfo_role', _user.UserRole);
    }
    
  }

  fetchToken() {

  }

  refreshToken() {

  }

  checkToken() {

  }
}
