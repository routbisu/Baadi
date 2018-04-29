import { Component, OnInit, Input, trigger, state, style, transition, group, animate } from '@angular/core';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({height: '*', opacity: 0})),
      transition(':leave', [
          style({height: '*', opacity: 1}),

          group([
              animate(150, style({height: 0})),
              animate('150ms ease-in-out', style({'opacity': '0'}))
          ])

      ]),
      transition(':enter', [
          style({height: '0', opacity: 0}),

          group([
              animate(150, style({height: '*'})),
              animate('150ms ease-in-out', style({'opacity': '1'}))
          ])

      ])
    ])
  ]
})
export class LeftNavbarComponent {

  logoUrl = 'assets/images/logo.png';
  iconUrl = 'assets/images/icon-72.png';

  @Input() isOpen: boolean;
  @Input() isOpenMobile: boolean;

}
