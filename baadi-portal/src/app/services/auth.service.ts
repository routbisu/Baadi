import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  emaiLoginUrl = environment.apiBaseUrl + 'authenticate';

  constructor(private http: HttpClient) { }

  emailLogin(credentials) {
    return this.http.post(this.emaiLoginUrl, credentials);
  }
}
