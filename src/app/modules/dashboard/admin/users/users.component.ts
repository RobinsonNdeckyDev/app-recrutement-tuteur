import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CandidatService } from '../../../../core/services/api/candidat.service';
import { GestionAdminComponent } from "../gestion-admin/gestion-admin.component";
import { GestionCandidatComponent } from "../gestion-candidat/gestion-candidat.component";
import { AdminService } from '../../../../core/services/api/admin.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, GestionAdminComponent, GestionCandidatComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
    tabUsers: any = [];
    tabAdmins: any = [];
    tabCandidats: any = [];
    afficherAdmin = false;
    afficherCandidat = false;

    constructor(
        private candidatService: CandidatService,
        private adminService: AdminService,
    ){}

    ngOnInit(): void {
        this.getAllAdmins();
        this.getAllCandidats();
    }

    afficherAdmins(): void {
        this.afficherAdmin = true;
        this.afficherCandidat = false;
    }

    afficherCandidats(): void {
        this.afficherAdmin = false;
        this.afficherCandidat = true;
    }

    getAllAdmins(){
        this.adminService.getAdmins().subscribe({
            next: (res) => {
                this.tabAdmins = res;
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    getAllCandidats(){
        this.candidatService.getCandidats().subscribe({
            next: (res) => {
                this.tabCandidats = res;
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

}
