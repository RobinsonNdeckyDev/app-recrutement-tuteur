import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnonceService } from '../../../core/services/api/annonce.service';

@Component({
  selector: 'app-detail-annonce',
  standalone: true,
  imports: [],
  templateUrl: './detail-annonce.component.html',
  styleUrl: './detail-annonce.component.css'
})
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
}
