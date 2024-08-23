import { Component, inject, OnInit } from '@angular/core';
import { Categorias } from '@core/interfaces/categorias.interface';
import { HttpResponse } from '@core/interfaces/http.interface';
import { AlertService } from '@core/services/alert.service';
import { CatalogosService } from '@core/services/catalogos.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { environment } from '@environment/environment';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuItemComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  private catalogosSrv = inject(CatalogosService);
  private alertSrv = inject(AlertService);

  menuItems: Categorias[] = [];

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.catalogosSrv.getCategorias().subscribe(
      (response: HttpResponse<Categorias[]>) => {
        const { error, codigo, message, menuItems } = response;
        console.log(response);
        if (error) {
          this.alertSrv.alertError(`${message} ${codigo}`);
        }
        if (menuItems.length > 0 && !this.validIdMenuDefult) {
          this.updateIdMenuDefult(menuItems[0].idMenu);
        }
        this.menuItems = menuItems;
        this.updateIdMenu();
      },
      () => this.alertSrv.alertError('Se ha producido un error al cargar datos')
    );
  }

  itemSelected(itemID: number): void {
    this.updateIdMenuDefult(itemID);
    this.catalogosSrv.changeCategoria.emit();
  }

  updateIdMenuDefult(idMenu: number): void {
    localStorage.setItem(environment.idMenuDefult, String(idMenu));
    this.updateIdMenu();
  }

  updateIdMenu(): void {
    this.menuItems.forEach((categoria: Categorias) => {
      categoria.active =
        categoria.idMenu ===
        Number(localStorage.getItem(environment.idMenuDefult));
    });
  }

  get validIdMenuDefult(): boolean {
    return Boolean(localStorage.getItem(environment.idMenuDefult));
  }
}
