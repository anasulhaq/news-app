import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyDashboardComponent} from './my-dashboard/my-dashboard.component';

const routes: Routes = [
  {path: '', component: MyDashboardComponent}, // Default route will route will to Request page
  {path: 'dashboard', component: MyDashboardComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
