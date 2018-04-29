import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './components/common/breadcrumb/breadcrumb.component';
import { LoginComponent } from './components/common/login/login.component';
import { LeftNavbarComponent } from './components/common/left-navbar/left-navbar.component';
import { TopNavbarComponent } from './components/common/top-navbar/top-navbar.component';
import { MobileProfileSectionComponent } from './components/common/mobile-profile-section/mobile-profile-section.component';
import { NavListItemComponent } from './components/common/nav-list-item/nav-list-item.component';
import { HomeComponent } from './components/pages/home/home.component';

// List of routes used in the application
const appRoutes = [
  // Home Page
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  // Login Page
  { path: 'login', component: LoginComponent },
  // Super Admin - Billing
  // { path: 'billing', component: SaBillingComponent, data: { breadcrumb: 'Billing' } },
  // Onboarding
  { path: 'onboarding', data: { breadcrumb: 'Onboarding' },
    children: [
      // Add a new apartment
      // { path: 'add', component: AddApartmentComponent, data: { breadcrumb: 'Add Apartment' } },
      // { path: 'manage', component: ManageApartmentComponent, data: { breadcrumb: 'Manage Apartments' } }
    ]
  },
  // Catch all route for undefined routes
  // { path: '**', component: SaHomeComponent, data: { breadcrumb: 'Home' } }
];

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    LoginComponent,
    LeftNavbarComponent,
    TopNavbarComponent,
    MobileProfileSectionComponent,
    NavListItemComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
