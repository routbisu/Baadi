import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Left nav bar open/close state
  isLeftNavbarOpen = true;

  // Toggle the state of left navbar
  toggleNav() {
    this.isLeftNavbarOpen = !this.isLeftNavbarOpen;
  }
}
