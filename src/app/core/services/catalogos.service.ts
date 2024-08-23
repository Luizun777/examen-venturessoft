import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable, Output } from '@angular/core';
import { Categorias } from '@core/interfaces/categorias.interface';
import { HttpResponse } from '@core/interfaces/http.interface';
import { environment } from '@environment/environment';
import { map, Observable } from 'rxjs';
import { MapingService } from './maping.service';

@Injectable({
  providedIn: 'root',
})
export class CatalogosService {
  private http = inject(HttpClient);
  private mapingSrv = inject(MapingService);

  @Output() changeCategoria: EventEmitter<void> = new EventEmitter();

  getCategorias(): Observable<HttpResponse<Categorias[]>> {
    return this.http
      .get<HttpResponse<Categorias[]>>(`${environment.apiServer}Categorias`)
      .pipe(
        map((response: HttpResponse<Categorias[]>) => ({
          ...response,
          menuItems: this.mapingSrv.acentoDescripcion(response.menuItems),
        }))
      );
  }
}
