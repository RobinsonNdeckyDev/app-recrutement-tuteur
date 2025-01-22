import { Injectable } from '@angular/core';

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
            access: ['vendeur', 'aide-vendeur'],
        },
        {
            title: 'Séances',
            route: './admin/seance',
            icon: 'bi bi-calendar',
            access: ['vendeur', 'aide-vendeur'],
        },
        {
            title: 'Paiements',
            route: './admin/paiement',
            icon: 'bi bi-wallet',
            access: ['vendeur', 'aide-vendeur'],
        },
        {
            title: 'Ressources',
            route: './admin/ressources',
            icon: 'pi pi-image',
            access: ['vendeur', 'aide-vendeur'],
        },
        {
            title: 'Support client',
            route: './admin/support-client',
            icon: 'pi pi-question',
            access: ['vendeur', 'aide-vendeur'],
        },
        {
            title: 'Newsletter',
            route: './admin/newsletter',
            icon: 'pi pi-box',
            access: ['vendeur', 'aide-vendeur'],
        },
        {
            title: 'Paramétres',
            route: './admin/parametres',
            icon: 'pi pi-cog',
            access: ['vendeur', 'aide-vendeur'],
        },

        // menu specialiste

        // menu patient
    ];

    constructor() {}

    // Recuperer la liste des menus
    getMenusDash(): MenuItem[] {
        return this.menus;
    }
}
