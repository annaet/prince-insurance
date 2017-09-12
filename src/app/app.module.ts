import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PolicyComponent } from './policy/policy.component';

import { WindowRef } from './window-ref/window-ref.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OverviewComponent } from './overview/overview.component';
import { PopupComponent } from './popup/popup.component';

const routes: Routes = [
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'overview',  component: OverviewComponent },
  { path: 'policy/:id', component: PolicyComponent },
  { path: 'app', component: AppComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PolicyComponent,
    SidebarComponent,
    OverviewComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
