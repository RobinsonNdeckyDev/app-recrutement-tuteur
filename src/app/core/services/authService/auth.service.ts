import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequest } from '../../models/login-request';
import { LoginResponse } from '../../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    // apiUrl 
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // méthode login pour envoyer une requête POST à l'API pour se connecter à l'application
    login(loginRequest: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, loginRequest);
    }

    // méthode logout pour supprimer le token et l'utilisateur du stockage local
    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    // méthode isLoggedIn pour vérifier si l'utilisateur est connecté
    isLoggedIn(): boolean {
        return !!localStorage.getItem
    }

    // méthode getToken pour récupérer le token du stockage local
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    // méthode setToken pour stocker le token dans le stockage local
    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

}
