import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { HttpResponse } from '@core/interfaces/http.interface';
import { Marca } from '@core/interfaces/marcas.interface';
import { AlertService } from '@core/services/alert.service';
import { CatalogosService } from '@core/services/catalogos.service';
import { MarcasService } from '@core/services/marcas.service';
import { environment } from '@environment/environment';
import { MarcaComponent } from '@shared/components/marca/marca.component';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MarcaComponent,
    MatProgressSpinnerModule,
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
  cargando: boolean = true;

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
  }
}
