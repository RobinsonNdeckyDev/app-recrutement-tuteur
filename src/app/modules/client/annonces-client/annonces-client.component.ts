import { Component } from '@angular/core';
import { AnnonceService } from '../../../core/services/api/annonce.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-annonces-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './annonces-client.component.html',
  styleUrl: './annonces-client.component.css'
})
export class AnnoncesClientComponent {
    tabAnnonces: any = [];

    constructor(
        private annonceService: AnnonceService
    ){}

    ngOnInit(){ 
        this.getAllAnnonces();       
    }

    getAllAnnonces(){
        this.annonceService.getAnnonces().subscribe(
            (annonces) => {
                console.log("Liste des annonces: ", annonces);
            },
            (error) => {
                console.log("erreur: ", error);
            }
        )
    }
}
