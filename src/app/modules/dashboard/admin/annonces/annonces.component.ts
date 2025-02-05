import { AnneeAcademique } from './../../../../core/models/annee-academique';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DateFormatPipe } from '../../../../shared/pipes/dateFormatPipe';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnneeAcademiqueService } from '../../../../core/services/api/annee-academique.service';
import { AnnonceService } from '../../../../core/services/api/annonce.service';

@Component({
  selector: 'app-annonces',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DateFormatPipe],
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.css'
})
export class AnnoncesComponent {

    tabsAnnonces: any = [];
    tabAnneeAcademiques: any = [];

    // Liste filtrée affichée dans le tableau
    tabAnnoncesFiltered: any[] = [];
    selectedAnnonce: any = [];
    annonceFormAdd!: FormGroup;
    annonceFormUpdate!: FormGroup;
    currentPage = 1;
    rowsPerPage = 4;
    totalPages = 0;


    constructor(
        private fb: FormBuilder,
        private toastr: ToastrService,
        private annonceService: AnnonceService,
        private anneeAcademiqueService: AnneeAcademiqueService
    ){
        this.annonceFormAdd = this.fb.group({
            titre: ['', Validators.required],
            description: ['', Validators.required],
            id_annee: ['', Validators.required],
            image: [''],
            auteur: ['', Validators.required],
            date_limite: ['', Validators.required],
            contenu: ['', Validators.required],
            // etat: ['']
        });

        this.annonceFormUpdate = this.fb.group({
            titre: ['', Validators.required],
            description: ['', Validators.required],
            id_annee: ['', Validators.required],
            image: [''],
            auteur: ['', Validators.required],
            date_limite: ['', Validators.required],
            contenu: ['', Validators.required],
            etat: ['', Validators.required]
        })
    }

    ngOnInit(){
        this.updatePagination();
        this.getAllAnneeAcademiques();
    }

    // Récupérer toutes les années académiques
    getAllAnneeAcademiques(){
        this.anneeAcademiqueService.getAnneesAcademiques().subscribe(
            (annees) => {
                console.log("Liste des annees academiques", annees);
                this.tabAnneeAcademiques = annees;
            },
            (error) => {
                console.error('Une erreur s\'est produite lors de la récupération des années académiques:', error);
            }
        )
    }


    // Récupérer toutes les annonces
    getAllAnnonces(){
        this.annonceService.getAnnonces().subscribe(
            (annonces) => {
                console.log("Liste des annonces", annonces);
                this.tabsAnnonces = annonces;
                this.updatePagination(); // Mettre à jour la pagination
            },
            (error) => {
                console.error('Une erreur s\'est produite lors de la récupération des annonces:', error);
            }
        )
    }

    // Ajouter une annonce
    addAnnonce() {
        if (this.annonceFormAdd.valid) {
            const formData = this.annonceFormAdd.value;

            // Convertir id_annee en nombre, si nécessaire
            formData.id_annee = Number(formData.id_annee);
    
            console.log("Données envoyées à l'API :", formData);
    
            // Appel à l'API pour ajouter l'annonce
            this.annonceService.addAnnonce(formData).subscribe(
                (annonce) => {
                    console.log("Annonce ajoutée", annonce);
                    this.getAllAnnonces();
                    document.getElementById('ajoutAnnonce')?.classList.remove('show');
                    document.body.classList.remove('modal-open');
                    document.querySelector('.modal-backdrop')?.remove();
                    this.toastr.success("Annonce ajoutée avec succès !");
                },
                (error) => {
                    console.error('Une erreur s\'est produite lors de l\'ajout de l\'annonce:', error);
                    this.toastr.error("Une erreur s'est produite lors de l'ajout de l'annonce.");
                }
            );
        }
    }
    

    // addAnnonce(){
    //     if(this.annonceFormAdd.valid){
    //         // Conversion de id_annee en number
    //         let formData = this.annonceFormAdd.value;
    //         formData.id_annee = Number(formData.id_annee); 

    //         if (isNaN(formData.id_annee) || formData.id_annee === 0) {
    //             this.toastr.error("L'année académique est invalide.");
    //             return;
    //         }

    //         console.log("anneeAcademiqueForm", this.annonceFormAdd.value);

    //         this.annonceService.addAnnonce(formData).subscribe(
    //             (annonce) => {
    //                 console.log("annonce ajoutée", annonce);
    //                 this.getAllAnnonces();
    //                 document.getElementById('ajoutAnnonce')?.classList.remove('show');
    //                 document.body.classList.remove('modal-open');
    //                 document.querySelector('.modal-backdrop')?.remove();
    //                 this.toastr.success("annonce ajoutée avec succes !")
    //             },
    //             (error) => {
    //                 console.error('Une erreur s\'est produite lors de l\'ajout de l\'annonce:', error);
    //                 this.toastr.error("Une erreur s'est produite lors de l'ajout de l'annonce.");
    //             }
    //         )
    //     }
    // }

    // Supprimer une annonce
    deleteAnnonce(id: number){
        this.annonceService.deleteAnnonce(id).subscribe(
            (annonce) => {
                console.log("response annonce supprimée", annonce);
                this.getAllAnnonces();
                this.toastr.success("annonce supprimée avec succes !")
            },
            (error) => {
                console.error('Une erreur s\'est produite lors de la suppression de l\'annonce:', error);
                this.toastr.error("Une erreur s'est produite lors de la suppression de l'annonce.");
            }
        )
    }

    // Afficher les détails d'une annonce
    showdetailsAnnonce(annonce:any){
        this.selectedAnnonce = {...annonce};
    }

    preRemplirFormulaire(id: number) {
        this.selectedAnnonce = this.tabsAnnonces.find(
            (annonce: any) => annonce.id === id
        );
    
        if (!this.selectedAnnonce) {
            console.error("annonce non trouvée !");
            this.toastr.error("Impossible de trouver l'annonce.");
            return;
        }
    
        // Mettre à jour le formulaire avec les valeurs existantes
        this.annonceFormUpdate.setValue({
            titre: this.selectedAnnonce.titre || '',
            description: this.selectedAnnonce.description || '',
            image: this.selectedAnnonce.image || '',
            auteur: this.selectedAnnonce.auteur || '',
            dateExpiration: this.selectedAnnonce.dateExpiration || '',
            contenu: this.selectedAnnonce.contenu || '',
            etat: this.selectedAnnonce.etat || '',
            anneeAcademique: this.selectedAnnonce.anneeAcademique || '',
        });
    
        console.log("Formulaire pré-rempli :", this.annonceFormUpdate.value);
    }

    updateAnnonce(id: number) {
        console.log("ID annonce à modifier :", id);
    
        const donnees = this.annonceFormUpdate.value;
        this.annonceService.updateAnnonce(id, donnees).subscribe(
            (updateAnnonce) => {
                console.log("Réponse API après mise à jour :", updateAnnonce);
    
                // Mettre à jour l'élément correspondant dans tabsAnnonces
                this.tabsAnnonces = this.tabsAnnonces.map((annonce: any) =>
                    annonce.id === id ? { ...annonce, ...updateAnnonce } : annonce
                );
    
                // Vérifier que selectedAnnee est bien mise à jour
                this.selectedAnnonce = { ...updateAnnonce };
    
                // Réafficher les nouvelles valeurs dans le formulaire
                this.annonceFormUpdate.patchValue({
                    

                });
    
                console.log("Données mises à jour dans le formulaire :", this.annonceFormUpdate.value);

                // this.getAllanneesAcademiques();
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
        this.tabAnnoncesFiltered = [...this.tabsAnnonces];
        this.totalPages = Math.ceil(this.tabsAnnonces.length / this.rowsPerPage);
    }

    // Change la page actuelle
    setPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        }
    }

    // Filtre la liste selon la recherche
    searchAnnonce(event: any) {
        const searchValue = event.target.value.toLowerCase();
        this.tabAnnoncesFiltered = this.tabsAnnonces.filter((annonce:any) =>
            annonce.title.toLowerCase().includes(searchValue) ||
            annonce.description.toLowerCase().includes(searchValue) ||
            annonce.auteur.toLowerCase().includes(searchValue)
        );

        
        this.totalPages = Math.ceil(this.tabAnnoncesFiltered.length / this.rowsPerPage);
        
        // Réinitialiser à la première page après filtrage
        this.currentPage = 1; 
    }


}
