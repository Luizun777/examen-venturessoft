import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpResponse } from '@core/interfaces/http.interface';
import { Marca } from '@core/interfaces/marcas.interface';
import { MarcasService } from '@core/services/marcas.service';
import { DetailComponent } from '@shared/components/detail/detail.component';
import { forkJoin, Subscription } from 'rxjs';
import { BtnTextIconComponent } from "@shared/components/btn-text-icon/btn-text-icon.component";
import { CatUnlock } from '@shared/catalogos/CatUnlockImages';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MatCardModule, DetailComponent, BtnTextIconComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  private marcasSrv = inject(MarcasService);

  marcas: Marca[] = [];

  private marcasSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.getMarcas();
  }

  ngOnDestroy(): void {
    this.marcasSub.unsubscribe();
  }

  getMarcas(): void {
    this.marcasSub = forkJoin([
      this.marcasSrv.getMarcas(4600), // Fuel
      this.marcasSrv.getMarcas(3400), // Travel
      this.marcasSrv.getMarcas(2100), // Restaurant
      this.marcasSrv.getMarcas(1100), // Softwere
    ]).subscribe((marcas: HttpResponse<Marca[]>[]) => {
      this.marcas = marcas
        .map(({ menuItems, error }: HttpResponse<Marca[]>, index: number) => {
          if (error) {
            return undefined;
          }
          return <Marca>{
            ...this.marcaRandom(menuItems),
            background: CatUnlock[index],
          };
        })
        .filter((marca: Marca | undefined) => marca) as Marca[];
    });
  }

  marcaRandom(marcas: Marca[]): Marca {
    const indiceAleatorio = Math.floor(Math.random() * marcas.length);
    return marcas[indiceAleatorio];
  }
}
