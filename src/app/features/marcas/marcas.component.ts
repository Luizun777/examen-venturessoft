import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HttpResponse } from '@core/interfaces/http.interface';
import { Marca } from '@core/interfaces/marcas.interface';
import { AlertService } from '@core/services/alert.service';
import { CatalogosService } from '@core/services/catalogos.service';
import { MarcasService } from '@core/services/marcas.service';
import { environment } from '@environment/environment';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DetailComponent } from '@shared/components/detail/detail.component';
import { BtnTextIconComponent } from '@shared/components/btn-text-icon/btn-text-icon.component';
import { DetailRowComponent } from '@shared/components/detail-row/detail-row.component';
import { ChangeGridComponent } from '@shared/components/change-grid/change-grid.component';
import { CatalogGeneric } from '@core/interfaces/catalogo-generico.interface';
import { GenericSelectComponent } from '@shared/components/generic-select/generic-select.component';
import { TranslationService } from '@core/services/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    DetailComponent,
    BtnTextIconComponent,
    DetailRowComponent,
    ChangeGridComponent,
    GenericSelectComponent,
  ],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.scss',
})
export class MarcasComponent implements OnInit, OnDestroy {
  private marcasSrv = inject(MarcasService);
  private catalogosSrv = inject(CatalogosService);
  private alertSrv = inject(AlertService);
  private translationSrv = inject(TranslationService);

  marcas: Marca[] = [];
  marcasFilter: Marca[] = [];
  sortByList: CatalogGeneric[] = [];

  cargando: boolean = true;
  showGrid: boolean = true;

  valueSort: number = 1;

  languageDefault: string = environment.languageDefault;

  translations: any = {};

  private translationSub: Subscription = new Subscription();
  private marcasSub: Subscription = new Subscription();
  private listenSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.getTranslation();
    if (Boolean(localStorage.getItem(environment.idMenuDefult))) {
      this.getMarcas();
    }
    this.listenCategoria();
  }

  ngOnDestroy(): void {
    this.marcasSub.unsubscribe();
    this.listenSub.unsubscribe();
    this.translationSub.unsubscribe();
  }

  getTranslation(): void {
    this.translationSub = this.translationSrv.translations.subscribe({
      next: async (translations: any) => {
        this.translations = {
          ...translations['marcas'],
          ...translations['languiaje'],
        };

        const catalago = await this.translationSrv.loadCatalogo(
          translations['languiaje'],
          'catSortByMarcas'
        );
        if (catalago) {
          this.sortByList = catalago;
        }
      },
    });
  }

  getMarcas(): void {
    this.marcas = [];
    this.marcasFilter = [];
    this.cargando = true;
    this.marcasSub = this.marcasSrv.getMarcas().subscribe({
      next: ({ codigo, menuItems, error, message }: HttpResponse<Marca[]>) => {
        if (error) {
          this.alertSrv.alertError(`${message} ${codigo}`);
        }
        this.cargando = false;
        this.marcas = menuItems;
        this.marcasFilter = [...menuItems].splice(0, 7);
        this.changeSortBy(this.valueSort);
        this.showGrid = this.persistGrid;
      },
      error: async () => {
        this.alertSrv.alertError(this.translations['errorFetch']);
        this.cargando = false;
      },
    });
  }

  listenCategoria(): void {
    this.listenSub = this.catalogosSrv.changeCategoria.subscribe(() => {
      this.marcasSub.unsubscribe();
      this.getMarcas();
    });
  }

  allCoupons(): void {
    this.marcasFilter = [...this.marcas];
    this.changeSortBy(this.valueSort);
  }

  marcasGrid(grid: boolean = true): void {
    this.showGrid = grid;
    localStorage.setItem(environment.gridkey, String(grid));
  }

  changeSortBy(valueSort: number): void {
    this.valueSort = Number(valueSort);
    const { key, orderBy }: CatalogGeneric =
      this.sortByList.find(({ value }) => value === valueSort) ??
      ({} as CatalogGeneric);
    this.marcasFilter = this.ordenarLista(
      this.marcasFilter,
      key ?? 'nombreMarca',
      orderBy
    );
  }

  ordenarLista(
    objetos: Marca[],
    propiedad: string,
    orden: string = 'asc'
  ): Marca[] {
    return objetos.sort((a: any, b: any) =>
      orden === 'asc'
        ? a[propiedad].localeCompare(b[propiedad])
        : b[propiedad].localeCompare(a[propiedad])
    );
  }

  get persistGrid(): boolean {
    if (!localStorage.getItem(environment.gridkey)) {
      localStorage.setItem(environment.gridkey, 'true');
    }
    return localStorage.getItem(environment.gridkey) === 'true';
  }
}
