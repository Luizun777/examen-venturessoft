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
import { SortByComponent } from '@shared/components/sort-by/sort-by.component';
import { SortByMarcasEs } from '@shared/catalogos/CatSortByMarcas';
import { CatalogGeneric } from '@core/interfaces/catalogo-generico.interface';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    DetailComponent,
    BtnTextIconComponent,
    DetailRowComponent,
    ChangeGridComponent,
    SortByComponent,
  ],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.scss',
})
export class MarcasComponent implements OnInit, OnDestroy {
  private marcasSrv = inject(MarcasService);
  private catalogosSrv = inject(CatalogosService);
  private alertSrv = inject(AlertService);

  marcas: Marca[] = [];
  marcasFilter: Marca[] = [];
  sortByList: CatalogGeneric[] = SortByMarcasEs;

  cargando: boolean = true;
  showGrid: boolean = true;

  valueSort: number = 1;

  private marcasSub: Subscription = new Subscription();
  private listenSub: Subscription = new Subscription();

  ngOnInit(): void {
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
      },
      () => {
        this.alertSrv.alertError('Se ha producido un error al cargar datos');
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

  ordenarLista(objetos: Marca[], propiedad: string, orden: string = 'asc') {
    return objetos.sort((a: any, b: any) => {
      if (orden === 'asc') {
        return a[propiedad].localeCompare(b[propiedad]);
      } else if (orden === 'des') {
        return b[propiedad].localeCompare(a[propiedad]);
      } else {
        console.error(`Orden no válido. Usa 'asc' o 'des'.`);
      }
    });
  }
}
