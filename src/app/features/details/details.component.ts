import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpResponse } from '@core/interfaces/http.interface';
import { Marca } from '@core/interfaces/marcas.interface';
import { MarcasService } from '@core/services/marcas.service';
import { DetailComponent } from '@shared/components/detail/detail.component';
import { forkJoin, Subscription } from 'rxjs';
import { BtnTextIconComponent } from '@shared/components/btn-text-icon/btn-text-icon.component';
import { TranslationService } from '@core/services/translation.service';
import { AlertService } from '@core/services/alert.service';
import { CommonModule } from '@angular/common';
import { Categorias } from '@core/interfaces/categorias.interface';
import { CatalogosService } from '@core/services/catalogos.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, DetailComponent, BtnTextIconComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  private marcasSrv = inject(MarcasService);
  private catalogosSrv = inject(CatalogosService);
  private alertSrv = inject(AlertService);
  private translationSrv = inject(TranslationService);

  marcas: Marca[] = [];

  private translationSub: Subscription = new Subscription();
  translations: any = {};

  private marcasSub: Subscription = new Subscription();
  private catalogosSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.translationSub = this.translationSrv.translations.subscribe(
      (translations: any) => (this.translations = translations['details'])
    );
    this.getCategorias();
  }

  ngOnDestroy(): void {
    this.marcasSub.unsubscribe();
    this.translationSub.unsubscribe();
    this.catalogosSub.unsubscribe();
  }

  getCategorias(): void {
    this.catalogosSub = this.catalogosSrv.getCategorias().subscribe({
      next: ({
        error,
        codigo,
        message,
        menuItems,
      }: HttpResponse<Categorias[]>) => {
        if (error) {
          this.alertSrv.alertError(`${message} ${codigo}`);
        }
        if (menuItems.length > 0) {
          const newListCat = this.getRandomCategorias(menuItems);
          this.getMarcas(newListCat);
        }
      },
      error: () =>
        this.alertSrv.alertError('Se ha producido un error al cargar datos'),
    });
  }

  getMarcas(categorias: Categorias[]): void {
    const listPeticion = categorias.map(({ idMenu }: Categorias) =>
      this.marcasSrv.getMarcas(idMenu)
    );
    this.marcasSub = forkJoin(listPeticion).subscribe({
      next: (marcas: HttpResponse<Marca[]>[]) => {
        this.marcas = marcas
          .map(({ menuItems, error }: HttpResponse<Marca[]>, index: number) => {
            if (error) {
              return undefined;
            }
            const background = `assets/images/details/${categorias[index][
              'descripción'
            ].trim()}.webp`;
            return <Marca>{
              ...this.marcaRandom(menuItems),
              background,
            };
          })
          .filter((marca: Marca | undefined) => marca) as Marca[];
      },
      error: () => {
        this.alertSrv.alertError(this.translations['errorFetch']);
      },
    });
  }

  marcaRandom(marcas: Marca[]): Marca {
    const indiceAleatorio = Math.floor(Math.random() * marcas.length);
    return marcas[indiceAleatorio];
  }

  getRandomCategorias(arrayCat: Categorias[]): Categorias[] {
    return arrayCat.sort(() => 0.5 - Math.random()).slice(0, 4);
  }
}
