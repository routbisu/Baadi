import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  invalidEmail = false;
  invalidPassword = false;
  errorMessageText = null;
  isProcessing = false;

  imageUrls: any = {
    icon: 'assets/images/icon-72.png',
    android: 'assets/images/android.svg',
    apple: 'assets/images/apple.svg',
    logo: 'assets/images/logo-bg.png',
    loader: 'assets/images/loader-ellipsis.svg'
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

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
      // Show loader
      this.isProcessing = true;
      this.authService.emailLogin(value).subscribe(data => {
        // Hide loader
        this.isProcessing = false;
        if (data.ErrorMessage) {
          switch (data.ErrorMessage) {
            case 'USER_NOT_FOUND':
              this.errorMessageText = 'This user was not found in our records.';
              break;

            case 'INCORRECT_PASSWORD':
              this.errorMessageText = 'Incorrect password. Please try again.';
          }
        } else {
          // Successful login
          this.authService.saveToken(data);
          // Start refresh token timer
          this.authService.refreshToken();

          let homeUrl = '';
          if (localStorage.getItem('__returnUrl')) {
            homeUrl = localStorage.getItem('__returnUrl');
            localStorage.removeItem('__returnUrl');
          }
          this.router.navigateByUrl(homeUrl);
        }
      });
    }
  }

}
