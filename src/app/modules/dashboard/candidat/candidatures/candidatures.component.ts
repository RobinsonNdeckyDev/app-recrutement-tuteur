import { Component } from '@angular/core';
import { CandidatureService } from '../../../../core/services/api/candidature.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-candidatures',
  standalone: true,
  imports: [],
  templateUrl: './candidatures.component.html',
  styleUrl: './candidatures.component.css'
})
export class CandidaturesComponent {
    tabCandidatures: any = [];

    constructor(
        private candidatureService: CandidatureService,
        private toastrService: ToastrService
    ) { }

    ngOnInit(): void {
        this.getAllCandidatures();
    }

    // Liste des candidatures
    getAllCandidatures(){
        this.candidatureService.getCandidatures().subscribe({
            next: (res: any) => {
                this.tabCandidatures = res;
                console.log("liste candidatures: ", res);
            },
            error: (err: any) => {
                this.toastrService.error(err.error.message, 'Erreur');
            }
        });
    }
}
