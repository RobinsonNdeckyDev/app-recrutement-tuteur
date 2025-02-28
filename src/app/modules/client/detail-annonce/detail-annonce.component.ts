import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnonceService } from '../../../core/services/api/annonce.service';
<<<<<<< HEAD
=======
import { Annonce } from '../../../core/models/annonce';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
>>>>>>> 008782fa7b40e70126159662bc301be9d029cba4

@Component({
  selector: 'app-detail-annonce',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-annonce.component.html',
  styleUrl: './detail-annonce.component.css'
})
<<<<<<< HEAD
export class DetailAnnonceComponent implements OnInit {
  annonce: any;

  constructor(
    private route: ActivatedRoute,
    private annonceService: AnnonceService
  ) {}

  ngOnInit() {
    this.loadAnnonceFromRoute();
  }

  private loadAnnonceFromRoute(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getAnnonceDetails(id);
    });
  }

  getAnnonceDetails(id: number) {
    this.annonceService.getAnnonce(id).subscribe({
      next: (response) => {
        this.annonce = response;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des détails de l\'annonce:', error);
      }
    });
  }
=======
export class DetailAnnonceComponent{
  constructor(
    private annonceService: AnnonceService,
    private route: ActivatedRoute
  ) {}

  annonce!: Annonce; 
  // Doit être UN seul objet, pas un tableau
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); 
    // Récupère l'ID de l'URL
    if (id) {
      this.getAnnonceById(id);
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
>>>>>>> 008782fa7b40e70126159662bc301be9d029cba4
}
