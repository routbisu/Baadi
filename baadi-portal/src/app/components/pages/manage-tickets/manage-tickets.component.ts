import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-manage-tickets',
  templateUrl: './manage-tickets.component.html',
  styleUrls: ['./manage-tickets.component.scss']
})
export class ManageTicketsComponent implements OnInit {

  columnDefs = [
    { headerName: 'Date', field: 'date' },
    { headerName: 'Subject', field: 'subject' },
    { headerName: 'Status', field: 'status'},
    { headerName: 'Assigned To', field: 'assigned'}
  ];

  rowData = [
    { date: '08-May-2018', subject: 'Leaking Water', status: 'pending', assigned: 'Raghu S' },
    { date: '08-May-2018', subject: 'Leaking Water', status: 'pending', assigned: 'Raghu S' },
    { date: '08-May-2018', subject: 'Leaking Water', status: 'pending', assigned: 'Raghu S' },
    { date: '08-May-2018', subject: 'Leaking Water', status: 'pending', assigned: 'Raghu S' }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('isAuth', this.authService._isAuthenticated);
  }

}
