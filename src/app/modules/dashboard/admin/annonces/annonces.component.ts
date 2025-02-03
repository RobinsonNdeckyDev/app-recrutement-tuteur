import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DateFormatPipe } from '../../../../shared/pipes/dateFormatPipe';

@Component({
  selector: 'app-annonces',
  standalone: true,
  imports: [CommonModule],
  providers: [DateFormatPipe],
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.css'
})
export class AnnoncesComponent {

    tabsAnnonces = [
        {
            id: 1,
            title: 'Annonce 1',
            description: 'Description de l\'annonce 1',
            dateCreation: new Date(),
            dateExpiration: new Date(),
            etat: 'En cours',
            auteur: 'John Doe',
            contenu: 'Contenu de l\'annonce 1',
            imageUrl: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            title: 'Annonce 2',
            description: 'Description de l\'annonce 2',
            dateCreation: new Date(),
            dateExpiration: new Date(),
            etat: 'Terminee',
            auteur: 'Jane Doe',
            contenu: 'Contenu de l\'annonce 2',
            imageUrl: 'https://via.placeholder.com/150',
        },
        {
            id: 3,
            title: 'Annonce 3',
            description: 'Description de l\'annonce 3',
            dateCreation: new Date(),
            dateExpiration: new Date(),
            etat: 'En cours',
            auteur: 'John Doe',
            contenu: 'Contenu de l\'annonce 3',
            imageUrl: 'https://via.placeholder.com/150',
        }
    ]

    constructor(){}

    ngOnInit(){

    }

}
