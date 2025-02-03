import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authService/auth.service';

export interface MenuItem {
    title: string; // Titre du menu
    icon: string; // Icône
    route: string; // Route associée
    access: string[]; // Rôles autorisés
}

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    private menus: MenuItem[] = [
        // Menu admin
        {
            title: 'Dashboard',
            route: './admin',
            icon: 'bi bi-speedometer',
            access: ['admin'],
        },
        {
            title: 'Utilisateurs',
            route: './admin/utilisateurs',
            icon: 'pi pi-users',
            access: ['admin'],
        },
        {
            title: 'Annonces',
            route: './admin/annonces',
            icon: 'bi bi-megaphone',
            access: ['admin'],
        },
        {
            title: 'Années académiques',
            route: './admin/anneesAcademiques',
            icon: 'bi bi-calendar',
            access: ['admin'],
        },
        {
            title: 'Candidatures',
            route: './admin/candidatures',
            icon: 'bi bi-folder',
            access: ['admin'],
        },
        {
            title: 'Documents',
            route: './admin/documents',
            icon: 'bi bi-files',
            access: ['admin'],
        },

        // menu candidat
        {
            title: 'Dashboard',
            route: './candidat',
            icon: 'bi bi-speedometer',
            access: ['candidat'],
        },
        {
            title: 'Mes candidatures',
            route: './candidat/candidatures',
            icon: 'pi pi-users',
            access: ['candidat'],
        },
        {
            title: 'Annonces',
            route: './candidat/annonces',
            icon: 'bi bi-calendar',
            access: ['candidat'],
        },
        {
            title: 'Mes Documents',
            route: './candidat/Documents',
            icon: 'pi pi-question',
            access: ['candidat'],
        },

    ];

    constructor(private router: Router, private authService: AuthService) {}

    // Recuperer la liste des menus
    getMenusDash(): MenuItem[] {

        // Récupérer le role de l'utilisateur
        const userConnected = this.authService.getCurrentUser();
        console.log('userConnected', userConnected);

        // Filtrer les menus en fonction du role
        if (userConnected) {
            this.menus = this.menus.filter((menu) => {
                return menu.access.includes(userConnected.role.toLowerCase());
            });
        }

        return this.menus;
    }
}
