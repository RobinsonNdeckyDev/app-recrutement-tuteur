export interface User {
    id?: number;
    email: string;
    password: string;
    prenom: string;
    nom: string;
    adresse: string;
    telephone: string;
    photo_profil: string;
    role: string;
    token?: string;
}
