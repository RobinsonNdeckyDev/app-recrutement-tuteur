import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AnneeAcademique } from '../../models/annee-academique'; // Assurez-vous que le modèle existe
import { AuthService } from '../authService/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AnneeAcademiqueService {
    private apiUrl = environment.apiEndpoint;

    constructor(private http: HttpClient, private authService: AuthService) {}

    // Méthode pour récupérer toutes les années académiques
    getAnneesAcademiques() {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token manquant');
            return throwError(
                // Retourner si le token est absent
                () => new Error('Token manquant')
            );
        }
        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return this.http.get<AnneeAcademique[]>(
            `${this.apiUrl}/annees_annonces`,
            { headers }
        );
    }

    // Méthode pour ajouter une nouvelle année académique (uniquement accessible par un admin)
    addAnneeAcademique(anneeAcademique: AnneeAcademique) {
        const token = localStorage.getItem('token');


        if (!this.authService.isAdmin()) {
            throw new Error(
                'Vous devez être un administrateur pour effectuer cette action.'
            );
        }

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return this.http.post<AnneeAcademique>(
            `${this.apiUrl}/annees_annonces`,
            anneeAcademique, 
            { headers }
        );
    }

    // Méthode pour mettre à jour une année académique (uniquement accessible par un admin)
    updateAnneeAcademique(id: number, anneeAcademique: AnneeAcademique) {
        if (!this.authService.isAdmin()) {
            throw new Error(
                'Vous devez être un administrateur pour effectuer cette action.'
            );
        }
        return this.http.put<AnneeAcademique>(
            `${this.apiUrl}/annees_annonces/${id}`,
            anneeAcademique
        );
    }

    // Méthode pour supprimer une année académique (uniquement accessible par un admin)
    deleteAnneeAcademique(id: number) {
        const token = localStorage.getItem('token');

        if (!this.authService.isAdmin()) {
            throw new Error(
                'Vous devez être un administrateur pour effectuer cette action.'
            );
        }

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return this.http.delete<void>(`${this.apiUrl}/annees_annonces/${id}`, { headers });
    }
}
