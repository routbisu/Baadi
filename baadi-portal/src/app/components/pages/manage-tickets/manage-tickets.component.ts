import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ColumnDef } from '../../../models/column-def';

@Component({
  selector: 'app-manage-tickets',
  templateUrl: './manage-tickets.component.html',
  styleUrls: ['./manage-tickets.component.scss']
})
export class ManageTicketsComponent implements OnInit {

  columnDefs: ColumnDef[];
  rowData: any[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('isAuth', this.authService._isAuthenticated);

    this.columnDefs = [
      { headerText: 'Ticket #', fieldName: 'TicketNumber' },
      { headerText: 'Title' },
      { headerText: 'Description', clipLength: 40 },
      { headerText: 'Assignee' },
      { headerText: 'Date Raised', fieldName: 'RaisedDate' },
      { headerText: 'Status' },
      { headerText: 'Completed Date', fieldName: 'CompletedDate' }
    ];

    this.rowData = [
      { TicketNumber: 'SEL000001', Title: 'Leaking Water', Description: 'Water is leaking from the tap in our bedroom. Please fix it soon.', Assignee: 'Raghu S', RaisedDate: '11-May-2018', Status: 'Pending', CompletedDate: null },
      { TicketNumber1: 'SEL000002', Title: 'Leaking Water', Description: 'Water is leaking from the tap in our balcony. Please fix it soon.', Assignee: 'Raghu S', RaisedDate: '11-May-2018', Status: 'Pending', CompletedDate: null },
      { TicketNumber: 'SEL000003', Title: 'Leaking Water', Description: 'Water is leaking from the tap in our balcony. Please fix it soon.', Assignee: 'Raghu S', RaisedDate: '11-May-2018', Status: 'Pending', CompletedDate: null },
      { TicketNumber: 'SEL000004', Title: 'Bulb blown', Description: 'Water is leaking from the tap in our balcony. Please fix it soon.', Assignee: 'Raghu S', RaisedDate: '11-May-2018', Status: 'Pending', CompletedDate: null },
      { TicketNumber: 'SEL000005', Title: 'Leaking Water', Description: 'Water is leaking from the tap in our balcony. Please fix it soon.', Assignee: 'Raghu S', RaisedDate: '11-May-2018', Status: 'Pending', CompletedDate: null },
      { TicketNumber: 'SEL000006', Title: 'Leaking Water', Description: 'Water is leaking from the tap in our balcony. Please fix it soon.', Assignee: 'Raghu S', RaisedDate: '11-May-2018', Status: 'Pending', CompletedDate: null },
      { TicketNumber: 'SEL000007', Title: 'Leaking Water', Description: 'Water is leaking.', Assignee: 'Raghu S', RaisedDate: '11-May-2018', Status: 'Pending', CompletedDate: null },
      { TicketNumber: 'SEL000008', Title: 'Leaking Water', Description: 'Water is leaking from the tap in our bedroom. Please fix it soon.', Assignee: 'Raghu S', RaisedDate: '11-May-2018', Status: 'Pending', CompletedDate: null },
      { TicketNumber: 'SEL000009', Title: 'Leaking Water', Description: 'Water is leaking from the tap in our bedroom. Please fix it soon.', Assignee: 'Raghu S', RaisedDate: '11-May-2018', Status: 'Pending', CompletedDate: null },
      { TicketNumber: 'SEL000010', Title: 'Leaking Water', Description: 'Water is leaking from the tap in our bedroom. Please fix it soon.', Assignee: 'Raghu S', RaisedDate: '11-May-2018', Status: 'Pending', CompletedDate: null },
      { TicketNumber: 'SEL000011', Title: 'Leaking Water', Description: 'Water is leaking from the tap in our bedroom. Please fix it soon.', Assignee: 'Raghu S', RaisedDate: '11-May-2018', Status: 'Pending', CompletedDate: null },
      { TicketNumber: 'SEL000012', Title: 'Leaking Water', Description: 'Water is leaking from the tap in our bedroom. Please fix it soon.', Assignee: 'Raghu S', RaisedDate: '11-May-2018', Status: 'Pending', CompletedDate: null },
      { TicketNumber: 'SEL000013', Title: 'Leaking Water', Description: 'Water is leaking from the tap in our bedroom. Please fix it soon.', Assignee: 'Raghu S', RaisedDate: '11-May-2018', Status: 'Pending', CompletedDate: null },
      { TicketNumber: 'SEL000014', Title: 'Leaking Water', Description: 'Water is leaking from the tap in our balcony. Please fix it soon.', Assignee: 'Raghu S', RaisedDate: '11-May-2018', Status: 'Pending', CompletedDate: null },
      { TicketNumber: 'SEL000015', Title: 'Leaking Water', Description: 'Water is leaking from the tap in our balcony. Please fix it soon.', Assignee: 'Raghu S', RaisedDate: '11-May-2018', Status: 'Pending', CompletedDate: null },
      { TicketNumber: 'SEL000016', Title: 'Leaking Water', Description: 'Water is leaking from the tap in our balcony. Please fix it soon.', Assignee: 'Raghu S', RaisedDate: '11-May-2018', Status: 'Pending', CompletedDate: null },
      { TicketNumber: 'SEL000017', Title: 'Leaking Water', Description: 'Water is leaking from the tap in our balcony. Please fix it soon.', Assignee: 'Raghu S', RaisedDate: '11-May-2018', Status: 'Pending', CompletedDate: null },
      { TicketNumber: 'SEL000018', Title: 'Leaking Water', Description: 'Water is leaking from the tap in our balcony. Please fix it soon.', Assignee: 'Raghu S', RaisedDate: '11-May-2018', Status: 'Pending', CompletedDate: null }
    ];
  }

  openTicket(value) {
    console.log('Open ticket', value);
  }

}
