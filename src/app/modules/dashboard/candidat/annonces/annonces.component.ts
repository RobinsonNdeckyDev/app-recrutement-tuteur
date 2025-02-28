import { Component } from '@angular/core';
import { AnnonceService } from '../../../../core/services/api/annonce.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/authService/auth.service';
import { FileService } from '../../../../core/services/api/file.service';
import { DocumentService } from '../../../../core/services/api/document.service';
import { CandidatureService } from '../../../../core/services/api/candidature.service';

@Component({
  selector: 'app-annonces',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.css'
})
export class AnnoncesComponent {
    tabAnnonces: any = [];
    tabDocuments: any = [];
    documentsFiltered: any = [];
    tabFilteredAnnonces: any = [];
    selectedAnnonce: any = [];
    userConnected: any = [];
    availableDocuments: any[] = []; // Documents valable pour selection
    selectedDocuments: any[] = [];
    selectedFile: File | null = null;
    annoncePostule: any = [];
    formcandidature: FormGroup;
    currentPage = 1;
    rowsPerPage = 4;
    totalPages = 0;

    constructor(
        private annonceService: AnnonceService,
        private toastrService: ToastrService,
        private authService: AuthService,
        private fileService: FileService,
        private candidatureService: CandidatureService,
        private documentService: DocumentService,
        private fb: FormBuilder,
        private http: HttpClient
    ){
        this.formcandidature = this.fb.group({
            userId: ['', Validators.required],
            annonceId: ['', Validators.required],
            documentIds: ['', Validators.required],
            etat: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.updatePagination();
        this.getAllAnnonces();
        this.getinfosUser();
        this.getAllDocuments();
    }

    // Gestion des fichiers images
    onFileSelected(event: any) {
        const file = event.target.files[0];
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (file) {
            if (file.size > maxSize) {
                this.toastrService.error('Le fichier est trop volumineux. Taille maximum : 5MB');
                return;
            }
            if (!allowedTypes.includes(file.type)) {
                this.toastrService.error('Format de fichier non supporté. Utilisez JPG, PNG ou GIF');
                return;
            }
            this.selectedFile = file;
        }
    }


    getinfosUser(){
        const userConnected = this.authService.getCurrentUser();
        if(userConnected){
            this.userConnected = userConnected;
            console.log("user infos: ", userConnected);
        }else{
            this.toastrService.error('Erreur lors de la récupération des informations de l\'utilisateur');
        }
    }

    getAllAnnonces(){
        this.annonceService.getAnnonces().subscribe({
            next: (res: any) => {
                this.tabAnnonces = res;
                console.log("tabAnnonces: ", this.tabAnnonces);
                this.updatePagination();
            },
            error: (err: any) => {
                this.toastrService.error('Erreur lors de la récupération des annonces');
            }
        });
    }

    prepareCandidature(annonce: any) {
        this.annoncePostule = annonce;
        console.log("Annonce pour candidature selectionné: ", this.annoncePostule);
        this.formcandidature.patchValue({
            annonceId: annonce.id,
            userId: this.userConnected.id,
            documentIds: this.getSelectedDocumentIds(), 
            etat: 'PENDING'
        });
    }

    getAllDocuments(){
        const userConnected = this.authService.getCurrentUser();
        if (userConnected) {
            this.documentService.getDocuments().subscribe({
                next: (documents) => {
                    console.log("docmentsList: ", documents);
                    // Filtrer les documents pour n'afficher que ceux de l'utilisateur connecté
                    this.tabDocuments = documents.filter(doc => doc.user?.id === userConnected.userId);
                    this.documentsFiltered = [...this.tabDocuments];
                    this.availableDocuments = [...this.documentsFiltered]; 
                    // this.updatePagination();
                    console.log("documents de l'utilisateur:", this.tabDocuments);
                },
                error: (error) => this.toastrService.error('Erreur lors du chargement des documents')
            });
        }
    }

    // Afficher les détails d'une annonce
    showdetailsAnnonce(annonce:any){
        this.selectedAnnonce = {...annonce};
        console.log("Annonce sélectionnée: ", this.selectedAnnonce)
    }

    // Met à jour la liste filtrée et le nombre total de pages
    updatePagination() {
        this.tabFilteredAnnonces = [...this.tabAnnonces];
        console.log("tabAnnoncesFiltered: ", this.tabFilteredAnnonces);
        this.totalPages = Math.ceil(this.tabAnnonces.length / this.rowsPerPage);
    }

    // Change la page actuelle
    setPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        }
    }

    // Retourne les années annonces paginées
    getPaginatedAnnonces(): any[] {
        const start = (this.currentPage - 1) * this.rowsPerPage;
        return this.tabFilteredAnnonces.slice(start, start + this.rowsPerPage);
    }

    // Filtre la liste selon la recherche
    searchAnnonce(event: any) {
        const searchValue = event.target.value.toLowerCase();
        this.tabFilteredAnnonces = this.tabAnnonces.filter((annonce:any) =>
            annonce.titre.toLowerCase().includes(searchValue) ||
            annonce.description.toLowerCase().includes(searchValue) ||
            annonce.auteur.toLowerCase().includes(searchValue)
        );


        this.totalPages = Math.ceil(this.tabFilteredAnnonces.length / this.rowsPerPage);

        // Réinitialiser à la première page après filtrage
        this.currentPage = 1;
    }

    // Méthode pour prévisualiser l'image
    getImageUrl(admin: any): string {
        if (admin?.photoProfil) {
            // Extrait le nom du fichier de l'URL complète
            const fileName = admin.photoProfil.split('/').pop();
            return this.fileService.getFileUrl(fileName);
        }
        return 'assets/images/default-profile.png';
    }

    onDocumentSelect(event: any, document: any) {
        if (event.target.checked) {
            // Vérifier si le document n'est pas déjà sélectionné
            if (!this.selectedDocuments.some(doc => doc.id === document.id)) {
                this.selectedDocuments.push(document);
            }
        } else {
            this.selectedDocuments = this.selectedDocuments.filter(doc => doc.id !== document.id);
        }
        
        this.formcandidature.patchValue({
            documentIds: this.getSelectedDocumentIds()
        });
    }
    
    removeDocument(doc: any) {
        // Trouver la checkbox correspondante et la décocher
        const checkbox = document.getElementById('doc_' + doc.id) as HTMLInputElement;
        if (checkbox) {
            checkbox.checked = false;
        }
    
        // Mettre à jour les listes
        this.selectedDocuments = this.selectedDocuments.filter(d => d.id !== doc.id);
        
        // Mettre à jour le formulaire
        this.formcandidature.patchValue({
            documentIds: this.getSelectedDocumentIds()
        });
    }

    getSelectedDocumentIds(): string {
        return this.selectedDocuments.map(doc => doc.id).join(',');
    }

    postCandidature(){
        this.formcandidature.patchValue({
            etat: 'PENDING'
        });

        if(this.formcandidature.valid && this.selectedDocuments.length > 0){
            this.toastrService.info("En cours d'envoi...");
            console.log("formCandidature: ", this.formcandidature.value);
            
            // Créer un Set pour éliminer les doublons
            const uniqueDocumentIds = [...new Set(this.formcandidature.get('documentIds')?.value.split(',').map(Number))];
            
            // l'objet de données
            const candidatureData = {
                userId: this.formcandidature.get('userId')?.value,
                annonceId: this.formcandidature.get('annonceId')?.value,
                documentIds: this.formcandidature.get('documentIds')?.value.split(',').map(Number),
                etat: this.formcandidature.get('etat')?.value
            };

            this.candidatureService.addCandidature(candidatureData).subscribe({
                next: (res: any) => {
                    console.log("response candidature: ", res);
                    this.toastrService.success("Candidature envoyée avec succès");
                    this.formcandidature.reset();
                    this.selectedDocuments = [];
                    this.availableDocuments = [...this.documentsFiltered];
                },
                error: (err: any) => {
                    this.toastrService.error("Erreur lors de l'envoi de la candidature");
                }
            });
        }else {
            this.toastrService.error('Veuillez remplir tous les champs requis');
        }
    }
}
