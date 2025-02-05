import { AnneeAcademique } from './../../../../core/models/annee-academique';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnneeAcademiqueService } from '../../../../core/services/api/annee-academique.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-annee-academique',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
],
  templateUrl: './annee-academique.component.html',
  styleUrl: './annee-academique.component.css'
})
export class AnneeAcademiqueComponent {

    tabAnneesAcademiques: any = [];
    selectedAnnee: any = [];
    anneeAcademiqueForm!: FormGroup;
    anneeAcademiqueFormUpdate!: FormGroup;

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

        this.anneeAcademiqueFormUpdate = this.fb.group({
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
                    document.getElementById('ajoutAnneeAcademique')?.classList.remove('show');
                    document.body.classList.remove('modal-open');
                    document.querySelector('.modal-backdrop')?.remove();
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

    // Afficher les détails d'une année académique
    showdetailsAnnee(anneeAcademique:any){
        this.selectedAnnee = {...anneeAcademique};
    }

    preRemplirFormulaire(id: number) {
        this.selectedAnnee = this.tabAnneesAcademiques.find(
            (annee: any) => annee.id_annee === id
        );
    
        if (!this.selectedAnnee) {
            console.error("Année académique non trouvée !");
            this.toastr.error("Impossible de trouver l'année académique.");
            return;
        }
    
        // Mettre à jour le formulaire avec les valeurs existantes
        this.anneeAcademiqueFormUpdate.setValue({
            annee: this.selectedAnnee.annee || '',
            dateDebut: this.selectedAnnee.dateDebut || '',
            dateFin: this.selectedAnnee.dateFin || ''
        });
    
        console.log("Formulaire pré-rempli :", this.anneeAcademiqueFormUpdate.value);
    }
    

    // Mettre à jour une année académique
    updateAnneeAcademique(id: number) {
        console.log("ID année à modifier :", id);
    
        const donnees = this.anneeAcademiqueFormUpdate.value;
        this.anneeAcademiqueService.updateAnneeAcademique(id, donnees).subscribe(
            (updatedAnnee) => {
                console.log("Réponse API après mise à jour :", updatedAnnee);
    
                // Mettre à jour l'élément correspondant dans tabAnneesAcademiques
                this.tabAnneesAcademiques = this.tabAnneesAcademiques.map((annee: any) =>
                    annee.id_annee === id ? { ...annee, ...updatedAnnee } : annee
                );
    
                // Vérifier que selectedAnnee est bien mise à jour
                this.selectedAnnee = { ...updatedAnnee };
    
                // Réafficher les nouvelles valeurs dans le formulaire
                this.anneeAcademiqueFormUpdate.patchValue({
                    annee: updatedAnnee.annee,
                    dateDebut: updatedAnnee.dateDebut,
                    dateFin: updatedAnnee.dateFin,
                });
    
                console.log("Données mises à jour dans le formulaire :", this.anneeAcademiqueFormUpdate.value);

                this.getAllanneesAcademiques();
                document.getElementById('modifierAnneeAcademique')?.classList.remove('show');
                document.body.classList.remove('modal-open');
                document.querySelector('.modal-backdrop')?.remove();

    
                this.toastr.success("Année mise à jour avec succès !");
            },
            (error) => {
                console.error("Erreur lors de la mise à jour de l'année :", error);
                this.toastr.error("Une erreur s'est produite lors de la mise à jour.");
            }
        );
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
