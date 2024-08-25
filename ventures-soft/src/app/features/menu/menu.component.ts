import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Categorias } from '@core/interfaces/categorias.interface';
import { HttpResponse } from '@core/interfaces/http.interface';
import { AlertService } from '@core/services/alert.service';
import { CatalogosService } from '@core/services/catalogos.service';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environment/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  private catalogosSrv = inject(CatalogosService);
  private alertSrv = inject(AlertService);
  private translationSrv = inject(TranslationService);

  menuItems: Categorias[] = [];
  cargando: boolean = true;

  private translationSub: Subscription = new Subscription();
  translations: any = {};

  ngOnInit(): void {
    this.translationSub = this.translationSrv.translations.subscribe(
      (translations: any) => (this.translations = translations['menu'])
    );
    this.getCategorias();
  }

  ngOnDestroy(): void {
    this.translationSub.unsubscribe();
  }

  getCategorias(): void {
    this.menuItems = [];
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
