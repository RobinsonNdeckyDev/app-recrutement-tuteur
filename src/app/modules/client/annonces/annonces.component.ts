import { Component } from '@angular/core';
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-annonces',
  standalone: true,
    imports: [DatePipe, RouterLink],
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.css'
})
export class AnnoncesComponent {
  annonces = [
    {id: 1, title: 'Annonce 1', content: 'Annonce 1', annee_academique: new Date(), image:"assets/banners/image 9.png"},
    {id: 2, title: 'Annonce 2', content: 'Annonce 2', annee_academique: new Date(), image:"assets/banners/image 9.png"},
    {id: 3, title: 'Annonce 3', content: 'Annonce 3', annee_academique: new Date(), image:"assets/banners/image-1.png"},
    {id: 4, title: 'Annonce 4', content: 'Annonce 4', annee_academique: new Date(), image:"assets/banners/image.png"},
    {id: 5, title: 'Annonce 5', content: 'Annonce 5', annee_academique: new Date(), image:"assets/banners/image 9.png"},
    {id: 6, title: 'Annonce 6', content: 'Annonce 6', annee_academique: new Date(), image:"assets/banners/image 9.png"}
]
}
