import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './components/common/breadcrumb/breadcrumb.component';
import { SaHomeComponent } from './components/super-admin/sa-home/sa-home.component';
import { LoginComponent } from './components/common/login/login.component';
import { AddApartmentComponent } from './components/admin/onboarding/add-apartment/add-apartment.component';
import { SaBillingComponent } from './components/super-admin/sa-billing/sa-billing.component';
import { LeftNavbarComponent } from './components/common/left-navbar/left-navbar.component';
import { TopNavbarComponent } from './components/common/top-navbar/top-navbar.component';
import { MobileProfileSectionComponent } from './components/common/mobile-profile-section/mobile-profile-section.component';
import { ManageApartmentComponent } from './components/admin/onboarding/manage-apartment/manage-apartment.component';

// List of routes used in the application
const appRoutes = [
  // Home Page
  { path: '', component: SaHomeComponent, data: { breadcrumb: 'Home' } },
  // Login Page
  { path: 'login', component: LoginComponent },
  // Super Admin - Billing
  { path: 'billing', component: SaBillingComponent, data: { breadcrumb: 'Billing' } },
  // Onboarding
  { path: 'onboarding', data: { breadcrumb: 'Onboarding' },
    children: [
      // Add a new apartment
      { path: 'add', component: AddApartmentComponent, data: { breadcrumb: 'Add Apartment' } },
      { path: 'manage', component: ManageApartmentComponent, data: { breadcrumb: 'Manage Apartments' } }
    ]
  },
  // Catch all route for undefined routes
  { path: '**', component: SaHomeComponent, data: { breadcrumb: 'Home' } }
];

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    SaHomeComponent,
    LoginComponent,
    AddApartmentComponent,
    SaBillingComponent,
    LeftNavbarComponent,
    TopNavbarComponent,
    MobileProfileSectionComponent,
    ManageApartmentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
