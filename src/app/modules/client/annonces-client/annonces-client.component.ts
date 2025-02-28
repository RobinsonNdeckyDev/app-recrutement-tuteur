import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../../core/services/api/annonce.service';
import { CommonModule } from '@angular/common';
import { Annonce } from '../../../core/models/annonce';

@Component({
  selector: 'app-annonces-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './annonces-client.component.html',
  styleUrl: './annonces-client.component.css'
})
export class AnnoncesClientComponent implements OnInit {

    annonces: Annonce[] = [];

    constructor(private annonceService: AnnonceService) {}

    ngOnInit(): void {
        this.getAllAnnonces();
    }

    getAllAnnonces(): void {
        this.annonceService.getAnnonces().subscribe({
            next: (data: Annonce[]) => {
            this.annonces = data;
            console.log("Annonces reçues :", this.annonces);
        },
            error: (err) => {
                console.error("Erreur lors de la récupération des annonces :", err);
            }
        });

    }
}
