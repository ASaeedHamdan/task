import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentPageComponent } from './appointment-page/appointment-page.component';

import { MaterialComponent } from './material/material.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch :'full'
  },
  { path:'home', component:MaterialComponent, pathMatch:'full'},
  { path:'appointmentPage', component:AppointmentPageComponent, pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
