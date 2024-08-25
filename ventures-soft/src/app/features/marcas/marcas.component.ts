import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CatalogGeneric } from '@core/interfaces/catalogo-generico.interface';
import { HttpResponse } from '@core/interfaces/http.interface';
import { Marca } from '@core/interfaces/marcas.interface';
import { AlertService } from '@core/services/alert.service';
import { CatalogosService } from '@core/services/catalogos.service';
import { MarcasService } from '@core/services/marcas.service';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environment/environment';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import {
  SortByMarcasEn,
  SortByMarcasEs,
} from 'src/assets/catalogos/CatSortByMarcas';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss'],
})
export class MarcasComponent implements OnInit, OnDestroy {
  private marcasSrv = inject(MarcasService);
  private catalogosSrv = inject(CatalogosService);
  private alertSrv = inject(AlertService);
  private translationSrv = inject(TranslationService);

  marcas: Marca[] = [];
  marcasFilter: Marca[] = [];
  sortByListEs: CatalogGeneric[] = SortByMarcasEs;
  sortByListEn: CatalogGeneric[] = SortByMarcasEn;

  cargando: boolean = true;
  showGrid: boolean = true;

  valueSort: number = 1;

  languageDefault: string = environment.languageDefault;

  marcas$: Observable<{ [key: string]: string }> = new Observable();
  languiaje$: Observable<string> = new Observable();

  private marcasSub: Subscription = new Subscription();
  private listenSub: Subscription = new Subscription();

  async ngOnInit(): Promise<void> {
    this.marcas$ = this.translationSrv.getTranslationObject$('marcas');
    this.languiaje$ = this.translationSrv.getTranslationObject$('languiaje');
    if (Boolean(localStorage.getItem(environment.idMenuDefult))) {
      this.getMarcas();
    }
    this.listenCategoria();
  }

  ngOnDestroy(): void {
    this.marcasSub.unsubscribe();
    this.listenSub.unsubscribe();
  }

  getMarcas(): void {
    this.marcas = [];
    this.marcasFilter = [];
    this.cargando = true;
    this.marcasSub = this.marcasSrv.getMarcas().subscribe(
      ({ codigo, menuItems, error, message }: HttpResponse<Marca[]>) => {
        if (error) {
          this.alertSrv.alertError(`${message} ${codigo}`);
        }
        this.cargando = false;
        this.marcas = menuItems;
        this.marcasFilter = [...menuItems].splice(0, 7);
        this.changeSortBy(this.valueSort);
        this.showGrid = this.persistGrid;
      },
      async () => {
        const mensaje = await firstValueFrom(this.marcas$);
        this.alertSrv.alertError(mensaje['errorFetch']);
        this.cargando = false;
      }
    );
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
      this.sortByListEn.find(({ value }) => value === valueSort) ??
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
