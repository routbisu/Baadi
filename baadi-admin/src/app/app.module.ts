import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './components/common/breadcrumb/breadcrumb.component';
import { SaHomeComponent } from './components/super-admin/sa-home/sa-home.component';
import { LoginComponent } from './components/common/login/login.component';

// List of routes used in the application
const appRoutes = [
  { path: '', component: SaHomeComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    SaHomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
