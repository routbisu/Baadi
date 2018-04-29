import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnChanges {


  logoUrl = 'assets/images/logo.png';
  chevronClass = 'fa-chevron-down';
  hamburgerIcon = 'fa-bars';
  isProfileSectionOpen = false;

  @Input() isOpen: boolean;
  @Input() resetHamburger: boolean;

  // Event emitter to control left navbar
  @Output() toggleLeftNavbar = new EventEmitter();
  // Event emitter to control left navbar for mobile
  @Output() toggleLeftNavbarMobile = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('Change detected');
      this.hamburgerIcon = 'fa-bars';
  }

  clickHamburgerDesktop() {
    this.toggleLeftNavbar.emit();
  }

  clickHamburgerMobile() {
    this.toggleLeftNavbarMobile.emit();
    if (this.hamburgerIcon === 'fa-bars') {
      this.hamburgerIcon = 'fa-times';
    } else {
      this.hamburgerIcon = 'fa-bars';
    }
  }

  // Toggle profile section for mobile
  toggleProfileSection() {
    this.isProfileSectionOpen = !this.isProfileSectionOpen;
    if (this.chevronClass === 'fa-chevron-down') {
      this.chevronClass = 'fa-chevron-up';
    } else {
      this.chevronClass = 'fa-chevron-down';
    }
  }
}
