import { BreadCrumb } from './../../../models/common/breadcrumb';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';
import 'rxjs/add/operator/filter';

interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs: IBreadcrumb[];
  public heading = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.breadcrumbs = [];
  }

  ngOnInit() {
    // Subscribe to the NavigationEnd event
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      // Set breadcrumbs
      const root: ActivatedRoute = this.activatedRoute.root;
      this.breadcrumbs = this.getBreadcrumbs(root);

      // Set heading
      const numBC = this.breadcrumbs.length;
      if (numBC > 0) {
        this.heading = this.breadcrumbs[numBC - 1].label;
      }
    });
  }

  private getBreadcrumbs(
    route: ActivatedRoute, url: string = '',
    breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {

    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

    // Get the child routes
    const children: ActivatedRoute[] = route.children;

    // Return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    // Iterate over all children
    for (const child of children) {
      // Verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      // Verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      // Get the route's URL segment
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      // Append route URL to URL
      url += `/${routeURL}`;

      // Add breadcrumb
      const breadcrumb: IBreadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };
      breadcrumbs.push(breadcrumb);

      // Recursion
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
