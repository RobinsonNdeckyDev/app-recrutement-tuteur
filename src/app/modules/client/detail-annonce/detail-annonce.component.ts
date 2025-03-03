import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from '../../../core/services/api/annonce.service';
import { Annonce } from '../../../core/models/annonce';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/authService/auth.service';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-detail-annonce',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-annonce.component.html',
  styleUrl: './detail-annonce.component.css'
})
export class DetailAnnonceComponent implements OnInit {
  isCandidat: boolean = false;

  constructor(
    private annonceService: AnnonceService,
    private route: ActivatedRoute,
    private authService: AuthService, private router: Router
  ) {}

  annonce!: Annonce; 
  // Doit être UN seul objet, pas un tableau
  ngOnInit(): void {
    this.prefillUserData();
    this.checkUserRole();
    const id = Number(this.route.snapshot.paramMap.get('id')); 
    // Récupère l'ID de l'URL
    if (id) {
      this.getAnnonceById(id);
    }
  }


  /** Pré-remplit le formulaire avec les infos de l'utilisateur connecté */
  prefillUserData(): void {
    const user: User | null = this.authService.getCurrentUser();
    if (user) {
      this.candidature.nom = user.nom || '';
      this.candidature.prenom = user.prenom || '';
      this.candidature.email = user.email || '';
      this.candidature.telephone = user.telephone || '';
    }
  }

  checkUserRole(): void {
    const user = this.authService.getCurrentUser();
    console.log("Utilisateur connecté :", user);

    if (user?.role === 'CANDIDAT') {
      this.isCandidat = true;
    } else {
      this.isCandidat = false;
    }
  }

  openModal(): void {
    if (this.isCandidat) {
      const modal = document.getElementById('candidatureModal');
      if (modal) {
      modal.style.display = 'block';
      modal.classList.add('show'); // Ajoute la classe Bootstrap
      modal.setAttribute('aria-hidden', 'false');
      modal.setAttribute('aria-modal', 'true');
      }
    } else {
      this.router.navigate(['/post-login']);
    }
  }

  closeModal(): void {
    const modal = document.getElementById('candidatureModal');
    if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');

    }
  }

  getAnnonceById(id: number): void {
    this.annonceService.getAnnonce(id).subscribe({
      next: (data: Annonce) => {
        this.annonce = data; 
        // Assigne directement l'annonce
        console.log("Annonce chargée :", this.annonce);
      },
      error: (err) => {
        console.error("Erreur lors de la récupération de l'annonce :", err);
      }
    });
  }
  
  //Modal pour validation de candidature
  step: number = 1;
  progress: number = 33;

  candidature = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    cv: null as File | null,
    diplome: null as File | null,
    attestation: null as File | null,
    lettre: null as File | null
  };

  // Gestion du passage entre les étapes
  nextStep() {
    if (this.step < 3) {
      this.step++;
      this.updateProgress();
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
      this.updateProgress();
    }
  }

  updateProgress() {
    this.progress = this.step === 1 ? 33 : this.step === 2 ? 66 : 100;
  }

  // Gestion de la sélection des fichiers
  onFileSelect(event: any, fileType: string) {
    const file = event.target.files[0];
    if (file) {
      this.candidature[fileType as keyof typeof this.candidature] = file;
    }
  }

  // Soumission de la candidature
  submitCandidature() {
    console.log("Candidature envoyée :", this.candidature);
    alert("Candidature soumise avec succès !");
    this.resetForm();
  }

  // Réinitialisation du formulaire après soumission
  resetForm() {
    this.step = 1;
    this.progress = 33;
    this.candidature = {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      cv: null,
      diplome: null,
      attestation: null,
      lettre: null
    };
  }
}
