import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-annee-academique',
  standalone: true,
  imports: [CommonModule,TableModule, TagModule, IconFieldModule, InputIconModule, HttpClientModule, InputTextModule, MultiSelectModule, SelectModule],
  templateUrl: './annee-academique.component.html',
  styleUrl: './annee-academique.component.css'
})
export class AnneeAcademiqueComponent {


    anneesAcademiques = [
        {
            id: 0,
            annee: '2024-2025',
            debut: '01/01/2024',
            fin: '31/12/2025'
        },
        {
            id: 1,
            annee: '2023-2024',
            debut: '01/01/2023',
            fin: '31/12/2024'
        },
        {
            id: 2,
            annee: '2022-2023',
            debut: '01/01/2022',
            fin: '31/12/2023'
        },
        {
            id: 3,
            annee: '2021-2022',
            debut: '01/01/2021',
            fin: '31/12/2022'
        },
        {
            id: 4,
            annee: '2020-2021',
            debut: '01/01/2020',
            fin: '31/12/2021'
        }
    ]

    // Liste filtrée affichée dans le tableau
    anneesAcademiquesFiltered: any[] = [];
    currentPage = 1;
    rowsPerPage = 4;
    totalPages = 0;

    // Initialisation du composant
    ngOnInit() {
        this.updatePagination();
    }

    // Met à jour la liste filtrée et le nombre total de pages
    updatePagination() {
        this.anneesAcademiquesFiltered = [...this.anneesAcademiques];
        this.totalPages = Math.ceil(this.anneesAcademiques.length / this.rowsPerPage);
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
        return this.anneesAcademiquesFiltered.slice(start, start + this.rowsPerPage);
    }

    // Filtre la liste selon la recherche
    searchAnneeAcademique(event: any) {
        const searchValue = event.target.value.toLowerCase();
        this.anneesAcademiquesFiltered = this.anneesAcademiques.filter(annee =>
        annee.annee.toLowerCase().includes(searchValue)
        );

        
        this.totalPages = Math.ceil(this.anneesAcademiquesFiltered.length / this.rowsPerPage);
        
        // Réinitialiser à la première page après filtrage
        this.currentPage = 1; 
    }

}
