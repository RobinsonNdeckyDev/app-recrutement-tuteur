import { Component, OnInit } from '@angular/core';
import { Annonce } from '../../../core/models/annonce';
import { AnnonceService } from '../../../core/services/annonceService/annonce.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-annonces',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.css'
})
export class AnnoncesComponent implements OnInit {
  annonces: Annonce[] = [];

  constructor(private annonceService: AnnonceService) {}

  ngOnInit(): void {
    this.getAllAnnonces();
  }

  getAllAnnonces(): void {
    this.annonceService.getAnnonces().subscribe((data: Annonce[]) => {
      this.annonces = data;
    });
  }
}
