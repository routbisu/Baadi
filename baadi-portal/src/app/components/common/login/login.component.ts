import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  invalidEmail = false;
  invalidPassword = false;
  errorMessageText = null;

  imageUrls: any = {
    icon: 'assets/images/icon-72.png',
    android: 'assets/images/android.svg',
    apple: 'assets/images/apple.svg',
    logo: 'assets/images/logo-bg.png'
  };

  constructor(private authService: AuthService) { }

  private resetValidation() {
    this.invalidEmail = false;
    this.invalidPassword = false;
    this.errorMessageText = null;
  }

  /**
   * Validation logic: EmailID & Password (min 6 characters long)
   * @param value Form value
   */
  private performValidation(value): boolean {
    this.resetValidation();
    let validState = true;

    const re = /\S+@\S+\.\S+/;
    if (!re.test(value.EmailId)) {
      this.invalidEmail = true;
      validState = false;
    }
    if (value.Password.length < 6) {
      this.invalidPassword = true;
      validState = false;
    }

    return validState;
  }

  emailLogin(value) {
    if (this.performValidation(value)) {
      this.authService.emailLogin(value).subscribe(data => {
        if (data.ErrorMessage) {
          switch (data.ErrorMessage) {
            case 'USER_NOT_FOUND':
              this.errorMessageText = 'This EmailId was not found in our records';
              break;

            case 'INCORRECT_PASSWORD':
              this.errorMessageText = 'Incorrect password';
          }
        } else {

        }
      });
    }
  }

}
