import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    { path: '', component: AdminDashComponent},
    { path: 'admin', component: AdminDashComponent},
    { path: 'utilisateurs', component: UsersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
