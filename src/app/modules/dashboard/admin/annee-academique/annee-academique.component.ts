import { AnneeAcademique } from './../../../../core/models/annee-academique';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { AnneeAcademiqueService } from '../../../../core/services/api/annee-academique.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-annee-academique',
  standalone: true,
  imports: [
    CommonModule,
    TableModule, 
    TagModule, 
    IconFieldModule, 
    InputIconModule, 
    InputTextModule, 
    MultiSelectModule, 
    SelectModule,
    ReactiveFormsModule
],
  templateUrl: './annee-academique.component.html',
  styleUrl: './annee-academique.component.css'
})
export class AnneeAcademiqueComponent {

    tabAnneesAcademiques: any = [];
    anneeAcademiqueForm!: FormGroup;

    // anneesAcademiques = [
    //     {
    //         id: 0,
    //         annee: '2024-2025',
    //         debut: '01/01/2024',
    //         fin: '31/12/2025'
    //     },
    //     {
    //         id: 1,
    //         annee: '2023-2024',
    //         debut: '01/01/2023',
    //         fin: '31/12/2024'
    //     },
    //     {
    //         id: 2,
    //         annee: '2022-2023',
    //         debut: '01/01/2022',
    //         fin: '31/12/2023'
    //     },
    //     {
    //         id: 3,
    //         annee: '2021-2022',
    //         debut: '01/01/2021',
    //         fin: '31/12/2022'
    //     },
    //     {
    //         id: 4,
    //         annee: '2020-2021',
    //         debut: '01/01/2020',
    //         fin: '31/12/2021'
    //     }
    // ]

    // Liste filtrée affichée dans le tableau
    
    anneesAcademiquesFiltered: any[] = [];
    currentPage = 1;
    rowsPerPage = 4;
    totalPages = 0;

    constructor(
        private anneeAcademiqueService: AnneeAcademiqueService,
        private fb: FormBuilder,
        private toastr: ToastrService
    ){
        this.anneeAcademiqueForm = this.fb.group({
            annee: ['', Validators.required],
            dateDebut: ['', Validators.required],
            dateFin: ['', Validators.required],
        })
    }

    // Initialisation du composant
    ngOnInit() {
        this.updatePagination();
        this.getAllanneesAcademiques();
    }
    

    // Récupérer toutes les années académiques
    getAllanneesAcademiques(){
        this.anneeAcademiqueService.getAnneesAcademiques().subscribe(
            (anneesAcademiques) => {
                console.log("AnneesAcademiques", anneesAcademiques);
                this.tabAnneesAcademiques = anneesAcademiques;
                this.updatePagination(); // Mettre à jour la pagination
            },
            (error) => {
                console.error('Une erreur s\'est produite lors de la récupération des annonces:', error);
            }
        )
    }

    // Ajouter une année académique
    addAnneeAcademique(){
        if(this.anneeAcademiqueForm.valid){
            console.log("anneeAcademiqueForm", this.anneeAcademiqueForm.value);
            this.anneeAcademiqueService.addAnneeAcademique(this.anneeAcademiqueForm.value).subscribe(
                (anneeAcademique) => {
                    console.log("anneeAcademique", anneeAcademique);
                    this.getAllanneesAcademiques();
                    this.anneeAcademiqueForm.reset();
                    this.toastr.success("année ajouté avec succes !")
                },
                (error) => {
                    console.error('Une erreur s\'est produite lors de la recherche des annonces:', error);
                    this.toastr.error("Une erreur s'est produite lors de l'ajout de l'année.");
                }
            )
        }
    }

    // Supprimer une année académique
    deleteAnneeAcademique(id: number){
        this.anneeAcademiqueService.deleteAnneeAcademique(id).subscribe(
            (anneeAcademique) => {
                console.log("anneeAcademique", anneeAcademique);
                this.getAllanneesAcademiques();
                this.toastr.success("annee supprimée avec succes !")
            },
            (error) => {
                console.error('Une erreur s\'est produite lors de la suppression de l\'annonces:', error);
                this.toastr.error("Une erreur s'est produite lors de la suppression de l'annee.");
            }
        )
    }
    

    // Met à jour la liste filtrée et le nombre total de pages
    updatePagination() {
        this.anneesAcademiquesFiltered = [...this.tabAnneesAcademiques];
        this.totalPages = Math.ceil(this.tabAnneesAcademiques.length / this.rowsPerPage);
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
        this.anneesAcademiquesFiltered = this.tabAnneesAcademiques.filter(
            (anneeAcademique: any) => 
            anneeAcademique.annee.toLowerCase().includes(searchValue)
        );

        
        this.totalPages = Math.ceil(this.anneesAcademiquesFiltered.length / this.rowsPerPage);
        
        // Réinitialiser à la première page après filtrage
        this.currentPage = 1; 
    }

}
