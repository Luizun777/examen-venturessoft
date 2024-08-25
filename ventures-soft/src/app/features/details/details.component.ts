import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HttpResponse } from '@core/interfaces/http.interface';
import { Marca } from '@core/interfaces/marcas.interface';
import { AlertService } from '@core/services/alert.service';
import { MarcasService } from '@core/services/marcas.service';
import { TranslationService } from '@core/services/translation.service';
import { forkJoin, Subscription } from 'rxjs';
import { CatUnlock } from 'src/assets/catalogos/CatUnlockImages';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  private marcasSrv = inject(MarcasService);
  private alertSrv = inject(AlertService);
  private translationSrv = inject(TranslationService);

  marcas: Marca[] = [];
  catUnlock: string[] = CatUnlock;

  private translationSub: Subscription = new Subscription();
  translations: any = {};

  private marcasSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.translationSub = this.translationSrv.translations.subscribe(
      (translations: any) => (this.translations = translations['details'])
    );
    this.getMarcas();
  }

  ngOnDestroy(): void {
    this.marcasSub.unsubscribe();
    this.translationSub.unsubscribe();
  }

  getMarcas(): void {
    this.marcasSub = forkJoin([
      this.marcasSrv.getMarcas(4600), // Fuel
      this.marcasSrv.getMarcas(3400), // Travel
      this.marcasSrv.getMarcas(2100), // Restaurant
      this.marcasSrv.getMarcas(1100), // Softwere
    ]).subscribe(
      (marcas: HttpResponse<Marca[]>[]) => {
        this.marcas = marcas
          .map(({ menuItems, error }: HttpResponse<Marca[]>, index: number) => {
            if (error) {
              return undefined;
            }
            return <Marca>{
              ...this.marcaRandom(menuItems),
              background: this.catUnlock[index],
            };
          })
          .filter((marca: Marca | undefined) => marca) as Marca[];
      },
      async () => {
        this.alertSrv.alertError(this.translations['errorFetch']);
      }
    );
  }

  marcaRandom(marcas: Marca[]): Marca {
    const indiceAleatorio = Math.floor(Math.random() * marcas.length);
    return marcas[indiceAleatorio];
  }
}
