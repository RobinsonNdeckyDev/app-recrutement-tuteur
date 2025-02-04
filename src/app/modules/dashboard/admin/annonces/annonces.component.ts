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
            dateExpiration: "06-02-25",
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
            dateExpiration: "10-02-25",
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
            dateExpiration: "18-02-25",
            etat: 'En cours',
            auteur: 'John Doe',
            contenu: 'Contenu de l\'annonce 3',
            imageUrl: 'https://via.placeholder.com/150',
        },
        {
            id: 4,
            title: 'Annonce 4',
            description: 'Description de l\'annonce 4',
            dateCreation: new Date(),
            dateExpiration: "25-02-25",
            etat: 'En cours',
            auteur: 'John Doe',
            contenu: 'Contenu de l\'annonce 4',
            imageUrl: 'https://via.placeholder.com/150',
        }
    ]

    // Liste filtrée affichée dans le tableau
    tabAnnoncesFiltered: any[] = [];
    currentPage = 1;
    rowsPerPage = 4;
    totalPages = 0;

    selectedAnnonce: any = null;

    constructor(){}

    ngOnInit(){
        this.updatePagination();
    }

    // Met à jour la liste filtrée et le nombre total de pages
    updatePagination() {
        this.tabAnnoncesFiltered = [...this.tabsAnnonces];
        this.totalPages = Math.ceil(this.tabsAnnonces.length / this.rowsPerPage);
    }

    // Change la page actuelle
    setPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        }
    }

    // Retourne les années académiques paginées
    get paginatedAnnees(): any[] {
        const start = (this.currentPage - 1) * this.rowsPerPage;
        return this.tabAnnoncesFiltered.slice(start, start + this.rowsPerPage);
    }

    // Filtre la liste selon la recherche
    searchAnnonce(event: any) {
        const searchValue = event.target.value.toLowerCase();
        this.tabAnnoncesFiltered = this.tabsAnnonces.filter(annonce =>
            annonce.title.toLowerCase().includes(searchValue) ||
            annonce.description.toLowerCase().includes(searchValue) ||
            annonce.auteur.toLowerCase().includes(searchValue)
        );

        
        this.totalPages = Math.ceil(this.tabAnnoncesFiltered.length / this.rowsPerPage);
        
        // Réinitialiser à la première page après filtrage
        this.currentPage = 1; 
    }

    // Afficher les détails d'une annonce
    showdetailsAnnonce(annonce:any){
        this.selectedAnnonce = {...annonce};
    }

    getAnnonce(id: number){
        this.selectedAnnonce = this.tabsAnnonces.find(annonce => annonce.id === id);
        console.log(this.selectedAnnonce);
    }

}
