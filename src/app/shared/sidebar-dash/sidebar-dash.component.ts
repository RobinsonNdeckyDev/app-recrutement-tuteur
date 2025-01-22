import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuService } from '../../core/services/menu-client/menu.service';

@Component({
  selector: 'app-sidebar-dash',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar-dash.component.html',
  styleUrl: './sidebar-dash.component.css'
})
export class SidebarDashComponent {
    // liste des menus
    MenuItems: any[] = [];


    // construction du composant
    constructor(
      private router: Router,
      private menuService: MenuService
    ){}

    // chargement de la liste des menus
    ngOnInit() {
      this.MenuItems = this.menuService.getMenusDash();
      console.log("liste des menus", this.MenuItems);
    }

    // recupération de la liste des menus
    getMenuItems() {
      return this.MenuItems;
    }
}
