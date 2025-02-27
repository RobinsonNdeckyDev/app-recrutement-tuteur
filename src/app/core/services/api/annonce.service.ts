import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../authService/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
    private apiUrl = environment.apiEndpoint;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    // service pour récupérer toutes les annonces
    getAnnonces() {
        return this.http.get(`${this.apiUrl}/annonces`);
    }

    // service pour récupérer une annonce par son ID
    getAnnonce(id: number) {
        return this.http.get(`${this.apiUrl}/annonces/${id}`);
    }

    // service pour ajouter une annonce
    addAnnonce(annonce: any) {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return this.http.post(`${this.apiUrl}/annonces`, annonce, {headers});
    }

    // service pour mettre à jour une annonce
    updateAnnonce(id: number, annonce: any) {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return this.http.put(`${this.apiUrl}/annonces/${id}`, annonce, {headers});
    }

    // service pour supprimer une annonce
    deleteAnnonce(id: number) {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return this.http.delete(`${this.apiUrl}/annonces/${id}`, {headers});
    }
}
