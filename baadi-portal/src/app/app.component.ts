import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Left nav bar open/close state
  isLeftNavbarOpen = true;
  // Left nav bar open/close state for mobile
  isLeftNavbarOpenMobile = true;
  // Reset hamburger icon
  resetHamburger: number;

  // Toggle the state of left navbar
  toggleNav() {
    this.isLeftNavbarOpen = !this.isLeftNavbarOpen;
  }

  // Toggle the state of left navbar for mobile
  toggleNavMobile() {
    this.isLeftNavbarOpenMobile = !this.isLeftNavbarOpenMobile;
  }

  closeNav() {
    // console.log('Nav ended');
    this.isLeftNavbarOpenMobile = true;
    this.resetHamburger = Math.random();
  }
}
