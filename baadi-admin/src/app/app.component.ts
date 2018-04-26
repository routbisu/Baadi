import { BreadCrumb } from './models/common/breadcrumb';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  header: BreadCrumb = {
    heading: 'Some heading',
    links: null
  };
}
