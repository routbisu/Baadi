import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-manage-tickets',
  templateUrl: './manage-tickets.component.html',
  styleUrls: ['./manage-tickets.component.scss']
})
export class ManageTicketsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('isAuth', this.authService._isAuthenticated);
  }

}
