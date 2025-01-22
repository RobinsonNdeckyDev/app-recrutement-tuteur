import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashCandidatComponent } from './dash-candidat/dash-candidat.component';
import { CandidaturesComponent } from './candidatures/candidatures.component';

const routes: Routes = [
    { path: '', component: DashCandidatComponent},
    { path: 'candidat', component: DashCandidatComponent},
    { path: 'candidatures', component: CandidaturesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatRoutingModule { }
