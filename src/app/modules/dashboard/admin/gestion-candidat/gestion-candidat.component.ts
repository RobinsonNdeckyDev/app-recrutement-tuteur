import { Component } from '@angular/core';
import { DateFormatPipe } from '../../../../shared/pipes/dateFormatPipe';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../../core/services/api/admin.service';
import { AuthService } from '../../../../core/services/authService/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-candidat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './gestion-candidat.component.html',
  styleUrl: './gestion-candidat.component.css'
})
export class GestionCandidatComponent {

    tabsAdmins: any = [];
    tabAdminsFiltered: any[] = [];
    selectedAdmin: any = [];
    adminFormAdd!: FormGroup;
    adminFormUpdate!: FormGroup;
    currentPage = 1;
    rowsPerPage = 4;
    totalPages = 0;

    constructor(
        private adminService: AdminService,
        private toastr: ToastrService,
        private authService: AuthService,
        private fb: FormBuilder,
    ){
        this.adminFormAdd = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            photoProfil: [''],
            prenom: ['', Validators.required],
            nom: ['', Validators.required],
            description: ['', Validators.required],
            adresse: ['', Validators.required],
            telephone: ['', Validators.required],
            role: ['ADMIN']
        });

        this.adminFormUpdate = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            photoProfil: [''],
            prenom: ['', Validators.required],
            nom: ['', Validators.required],
            description: ['', Validators.required],
            adresse: ['', Validators.required],
            telephone: ['', Validators.required],
            role: ['ADMIN']
        })
    }

    // Iniialisation
    ngOnInit() {
        this.updatePagination();
        this.getAllAdmins();
    }


    // Récupérer toutes les admins
    getAllAdmins(){
        this.adminService.getAdmins().subscribe(
            (admins) => {
                console.log("Liste des admins", admins);
                this.tabsAdmins = admins;
                this.updatePagination(); // Mettre à jour la pagination
            },
            (error) => {
                console.error('Une erreur s\'est produite lors de la récupération des admins:', error);
            }
        )
    }

    // Ajouter un admin
    addAdmin(){
        if(this.adminFormAdd.valid){
            console.log("adminFormAdd", this.adminFormAdd.value);
            this.authService.inscription(this.adminFormAdd.value).subscribe(
                (admin) => {
                    console.log("Admin pour ajout", admin);
                    this.getAllAdmins();
                    document.getElementById('ajoutAdmin')?.classList.remove('show');
                    document.body.classList.remove('modal-open');
                    this.adminFormAdd.reset();
                    document.querySelector('.modal-backdrop')?.remove();
                    this.toastr.success("année ajouté avec succes !")
                },
                (error) => {
                    console.error('Une erreur s\'est produite lors de l\'ajout d\'un admin:', error);
                    this.toastr.error("Une erreur s'est produite lors de l'ajout d'un admin'.");
                }
            )
        }
    }

    // Afficher les détails d'un admin
    showdetailsAdmin(admin:any){
        this.selectedAdmin = {...admin};
    }

    preRemplirFormulaire(id: number) {
        this.selectedAdmin = this.tabsAdmins.find(
            (admin: any) => admin.id === id
        );

        if (!this.selectedAdmin) {
            console.error("Admin non trouvée !");
            this.toastr.error("Impossible de trouver cet admin.");
            return;
        }

        // Mettre à jour le formulaire avec les valeurs existantes
        this.adminFormUpdate.setValue({
            prenom: this.selectedAdmin.prenom || '',
            nom: this.selectedAdmin.nom || '',
            password: this.selectedAdmin.password || '',
            email: this.selectedAdmin.email || '',
            description: this.selectedAdmin.description || '',
            adresse: this.selectedAdmin.adresse || '',
            telephone: this.selectedAdmin.telephone || '',
            photoProfil: this.selectedAdmin.photoProfil || '',
        });

        console.log("Formulaire pré-rempli :", this.adminFormUpdate.value);
    }

    // Mettre à jour un admin
    updateAdmin(id: number) {
        console.log("ID admin à modifier :", id);

        const donnees = this.adminFormUpdate.value;
        this.adminService.updateAdmin(id, donnees).subscribe(
            (updateAdmin) => {
                console.log("Réponse API après mise à jour :", updateAdmin);

                // Mettre à jour l'élément correspondant dans tabsAdmins
                this.tabsAdmins = this.tabsAdmins.map((admin: any) =>
                    admin.id === id ? { ...admin, ...updateAdmin } : admin
                );

                // Vérifier que selectedAdmin est bien mise à jour
                this.selectedAdmin = { ...updateAdmin };

                // Réafficher les nouvelles valeurs dans le formulaire
                this.adminFormUpdate.patchValue({


                });

                console.log("Données mises à jour dans le formulaire :", this.adminFormUpdate.value);

                // this.getAllanneesAcademiques();
                document.getElementById('modifierAdmin')?.classList.remove('show');
                document.body.classList.remove('modal-open');
                document.querySelector('.modal-backdrop')?.remove();


                this.toastr.success("Admin mise à jour avec succès !");
            },
            (error) => {
                console.error("Erreur lors de la mise à jour de l'admin :", error);
                this.toastr.error("Une erreur s'est produite lors de la mise à jour.");
            }
        );
    }

    // Supprimer un admin
    deleteAdmin(id: number){
        this.adminService.deleteAdmin(id).subscribe(
            (admin) => {
                console.log("admin à supprimer", admin);
                this.getAllAdmins();
                this.toastr.success("admin supprimé avec succes !")
            },
            (error) => {
                console.error('Une erreur s\'est produite lors de la suppression de l\'admin:', error);
                this.toastr.error("Une erreur s'est produite lors de la suppression de l'admin.");
            }
        )
    }

    // Met à jour la liste filtrée et le nombre total de pages
    updatePagination() {
        this.tabAdminsFiltered = [...this.tabsAdmins];
        console.log("tabAdminFiltered: ", this.tabAdminsFiltered);
        this.totalPages = Math.ceil(this.tabsAdmins.length / this.rowsPerPage);
    }

    // Change la page actuelle
    setPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        }
    }

    // Retourne les années admins paginées
    getPaginatedAdmin(): any[] {
        const start = (this.currentPage - 1) * this.rowsPerPage;
        return this.tabAdminsFiltered.slice(start, start + this.rowsPerPage);
    }

    // Filtre la liste selon la recherche
    searchAdmin(event: any) {
        const searchValue = event.target.value.toLowerCase();
        this.tabAdminsFiltered = this.tabsAdmins.filter((admin:any) =>
            admin.prenom.toLowerCase().includes(searchValue) ||
            admin.nom.toLowerCase().includes(searchValue)
        );


        this.totalPages = Math.ceil(this.tabAdminsFiltered.length / this.rowsPerPage);

        // Réinitialiser à la première page après filtrage
        this.currentPage = 1;
    }
}


// --------------------------------------------------------------------------------------------

