import { Component, OnInit } from '@angular/core';
import { Annonce } from '../../../core/models/annonce';
import { AnnonceService } from '../../../core/services/annonceService/annonce.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-annonces',
  standalone: true,
  imports: [
    RouterModule, CommonModule
  ],
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.css'
})
export class AnnoncesComponent implements OnInit {
  annonces: Annonce[] = [];

  constructor(private annonceService: AnnonceService) {}

  ngOnInit(): void {
    this.getAllAnnonces();
  }

  getAllAnnonces(): void {
    this.annonceService.getAnnonces().subscribe({
      next: (data: Annonce[]) => {
        console.log('Données reçues :', data); // 🔵 Vérifie les données ici
        this.annonces = data;
        console.log('Données récuperer');
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des annonces :', err);
      }
    });
  }
}
