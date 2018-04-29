import {
  Component, OnInit, trigger, transition, style,
  animate, state, group, Input, SimpleChanges, ElementRef, AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-nav-list-item',
  templateUrl: './nav-list-item.component.html',
  styleUrls: ['./nav-list-item.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({width: '220px', opacity: 0})),
      transition(':leave', [
          style({width: '220px', opacity: 1}),

          group([
              animate(150, style({height: 0})),
              animate('150ms ease-in-out', style({'opacity': '0'}))
          ])

      ]),
      transition(':enter', [
          style({width: '0px', opacity: 0}),

          group([
              animate(150, style({width: '220px'})),
              animate('150ms ease-in-out', style({'opacity': '1'}))
          ])

      ])
    ])
  ]
})
export class NavListItemComponent implements AfterViewInit   {

  // Check if left navbar is open
  @Input() isNavOpen: boolean;
  @Input() menu: any;

  showSubMenu = false;
  showSubMenuCondensed = false;
  keepMenuOpenFlag = false;
  subMenuPosition = '0px';
  chevronDirection = 'fa-chevron-right';
  closeMenuTimeout: any = null;

  constructor(private elRef: ElementRef) {}

  // Toggle submenu when main menu is open
  toggleChild() {
    this.showSubMenu = !this.showSubMenu;
    if (this.showSubMenu) {
      this.chevronDirection = 'fa-chevron-down';
    } else {
      this.chevronDirection = 'fa-chevron-right';
    }
  }

  ngAfterViewInit() {
    this.subMenuPosition = this.elRef.nativeElement.offsetTop + 12 + 'px';
  }

  // Toggle submenu when main menu is condensed
  toggleChildCondensed(delay = false) {
    if (!this.isNavOpen) {
      if (delay) {
        this.closeMenuTimeout = setTimeout(() => {
          if (!this.keepMenuOpenFlag) {
            this.showSubMenuCondensed = !this.showSubMenuCondensed;
          }
        }, 100);
      } else {
        this.showSubMenuCondensed = !this.showSubMenuCondensed;
      }
    }
  }

  // Keep menu open if sub menu is on mouse focus
  keepMenuOpen() {
    this.keepMenuOpenFlag = true;
    clearTimeout(this.closeMenuTimeout);
  }

  // Close menu on mouse leave
  closeMenu() {
    this.showSubMenuCondensed = false;
    this.keepMenuOpenFlag = false;
  }
}
