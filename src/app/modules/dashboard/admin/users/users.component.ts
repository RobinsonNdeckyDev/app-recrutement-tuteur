import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '../../../../shared/pipes/dateFormatPipe';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CandidatService } from '../../../../core/services/api/candidat.service';
import { GestionAdminComponent } from "../gestion-admin/gestion-admin.component";
import { GestionCandidatComponent } from "../gestion-candidat/gestion-candidat.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, GestionAdminComponent, GestionCandidatComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

    afficherAdmin = false;
    afficherCandidat = false;

    afficherAdmins(): void {
        this.afficherAdmin = true;
        this.afficherCandidat = false;
    }

    afficherCandidats(): void {
        this.afficherAdmin = false;
        this.afficherCandidat = true;
    }

}
