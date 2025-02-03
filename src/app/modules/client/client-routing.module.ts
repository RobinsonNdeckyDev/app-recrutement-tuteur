import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccueilComponent} from "./accueil/accueil.component";
import {AboutComponent} from "./about/about.component";
import {AnnoncesComponent} from "./annonces/annonces.component";
import { ContactComponent } from "./contact/contact.component";
import { DetailAnnonceComponent } from './detail-annonce/detail-annonce.component';

const routes: Routes = [
  { path: '', component: AccueilComponent},
  { path: 'accueil', component: AccueilComponent},
  { path: 'about', component: AboutComponent},
  { path: 'annonces', component: AnnoncesComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'detailAnnonce/:id', component: DetailAnnonceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
