import { Component, inject, OnInit } from '@angular/core';
import { Categorias } from '@core/interfaces/categorias.interface';
import { HttpResponse } from '@core/interfaces/http.interface';
import { AlertService } from '@core/services/alert.service';
import { CatalogosService } from '@core/services/catalogos.service';
import { environment } from '@environment/environment';
import { MenuItemComponent } from '@shared/components/menu-item/menu-item.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuItemComponent, MatProgressBarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  private catalogosSrv = inject(CatalogosService);
  private alertSrv = inject(AlertService);

  menuItems: Categorias[] = [];
  cargando: boolean = true;

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.menuItems = []
    this.cargando = true;
    this.catalogosSrv.getCategorias().subscribe(
      ({ error, codigo, message, menuItems }: HttpResponse<Categorias[]>) => {
        if (error) {
          this.alertSrv.alertError(`${message} ${codigo}`);
        }
        if (menuItems.length > 0 && !this.validIdMenuDefult) {
          this.updateIdMenuDefult(menuItems[0].idMenu);
          this.catalogosSrv.changeCategoria.emit();
        }
        this.menuItems = menuItems;
        this.updateIdMenu();
        this.cargando = false;
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
