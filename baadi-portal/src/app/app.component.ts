import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // Left nav bar open/close state
  isLeftNavbarOpen = true;
  // Left nav bar open/close state for mobile
  isLeftNavbarOpenMobile = true;
  // Reset hamburger icon
  resetHamburger: number;

  // Get viewport width and condense the navbar width accordingly
  // for tablets and below
  ngOnInit() {
    if (window && window.screen) {
      if (window.screen.width > 450 && window.screen.width < 992) {
        this.isLeftNavbarOpen = false;
      }
    }
  }

  // Toggle the state of left navbar
  toggleNav() {
    this.isLeftNavbarOpen = !this.isLeftNavbarOpen;
    console.log(window.screen.width);
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
