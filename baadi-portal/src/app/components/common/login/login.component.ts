import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  imageUrls: any = {
    icon: 'assets/images/icon-72.png',
    android: 'assets/images/android.svg',
    apple: 'assets/images/apple.svg',
    logo: 'assets/images/logo-bg.png'
  };

  constructor() { }

  ngOnInit() {
  }

  login(value) {
    console.log(value);
  }

}
