import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Annonce } from '../../../core/models/annonce';
import { AnnonceService } from '../../../core/services/annonceService/annonce.service';

@Component({
  selector: 'app-detail-annonce',
  standalone: true,
  imports: [],
  templateUrl: './detail-annonce.component.html',
  styleUrl: './detail-annonce.component.css'
})
export class DetailAnnonceComponent implements OnInit{
  annonce!: Annonce;

  constructor(
    private route: ActivatedRoute,
    private annonceService: AnnonceService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getAnnonce(id);
  }

  getAnnonce(id: number): void {
    this.annonceService.getAnnonceById(id).subscribe((data: Annonce) => {
      this.annonce = data;
    });
  }
}
