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

  // List of nav menu items
  navMenuItems: any = [
    {
      'navListItemText': 'Home',
      'faIcon': 'fas fa-home',
      'faIconColor': '#A44EAF',
      'link': '/'
    },
    {
      'navListItemText': 'Visitors',
      'faIcon': 'fas fa-user',
      'faIconColor': '#3BA9F4',
      'subMenu': [
        { 'navListChildItemText': 'Invite Visitor', 'link': '/visitors/invite' },
        { 'navListChildItemText': 'List Visitors', 'link': '/visitors/list' },
      ]
    },
    {
      'navListItemText': 'Amenities',
      'faIcon': 'fas fa-table-tennis',
      'faIconColor': '#F44336',
      'subMenu': [
        { 'navListChildItemText': 'Party Hall Booking', 'link': '/tickets/raise' },
        { 'navListChildItemText': 'Request Parking Space', 'link': '/tickets/manage' },
      ]
    },
    {
      'navListItemText': 'Helpdesk',
      'faIcon': 'fas fa-question-circle',
      'faIconColor': '#4CAF50',
      'subMenu': [
        { 'navListChildItemText': 'Raise Ticket', 'link': '/tickets/raise' },
        { 'navListChildItemText': 'View Tickets', 'link': '/tickets/manage' },
      ]
    },
    {
      'navListItemText': 'Deliveries',
      'faIcon': 'fas fa-shopping-cart',
      'faIconColor': '#3F51B5',
      'link': '/delivery'
    },
    {
      'navListItemText': 'My Bills',
      'faIcon': 'fas fa-calculator',
      'faIconColor': '#FF9800',
      'link': '/billing'
    }
  ];

  logoUrl = 'assets/images/logo.png';
  iconUrl = 'assets/images/icon-72.png';

  @Input() isOpen: boolean;
  @Input() isOpenMobile: boolean;

}
