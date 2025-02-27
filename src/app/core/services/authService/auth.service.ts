import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginRequest } from '../../models/login-request';
import { LoginResponse } from '../../models/login-response';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../models/registerRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiEndpoint;
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) {
        this.loadUserFromStorage();
    }

    private loadUserFromStorage(): void {
        const userStr = localStorage.getItem('infosUser');
        if (userStr) {
            this.currentUserSubject.next(JSON.parse(userStr));
        }
    }

    // Connexion d'un utilisateur
    login(loginRequest: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, loginRequest);
    }

    // Inscription d'un candidat
    inscription(RegisterRequest: RegisterRequest): Observable<RegisterRequest> {
        return this.http.post<RegisterRequest>(`${this.apiUrl}/auth/register`, RegisterRequest);
    }


    setUserData(response: LoginResponse): void {
        console.log("response login", response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('infosUser', JSON.stringify(response.infosUser));
        this.currentUserSubject.next(response.infosUser);
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('infosUser');
        this.currentUserSubject.next(null);
        window.location.href = '/login';
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    isAdmin(): boolean {
        const user = this.getCurrentUser();
        return user?.role === 'ADMIN';
    }

    isCandidate(): boolean {
        const user = this.getCurrentUser();
        return user?.role === 'CANDIDAT';
    }

    isLoggedIn(): boolean {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('infosUser');
        return !!token && !!user;
    }

    autoLogin() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('infosUser');
        
        if (token && user) {
            this.currentUserSubject.next(JSON.parse(user));
            return true;
        }
        return false;
    }
}
