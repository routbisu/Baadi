import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {

  logoUrl = 'assets/images/logo.png';

  @Input() isOpen: boolean;
  // Event emitter to control left navbar
  @Output() toggleLeftNavbar = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickHamburgerDesktop() {
    this.toggleLeftNavbar.emit();
  }
}
