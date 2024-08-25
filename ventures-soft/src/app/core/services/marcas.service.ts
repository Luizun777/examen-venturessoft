import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Marca } from '@core/interfaces/marcas.interface';
import { environment } from '@environment/environment';
import { HttpResponse } from '@core/interfaces/http.interface';

@Injectable({
  providedIn: 'root',
})
export class MarcasService {
  private http = inject(HttpClient);

  getMarcas(idMenu?: number): Observable<HttpResponse<Marca[]>> {
    idMenu = idMenu ??=
      Number(localStorage.getItem(environment.idMenuDefult)) ?? 0;
    return this.http.get<HttpResponse<Marca[]>>(
      `${environment.apiServer}Marcas?idMenu=${idMenu}`
    );
  }
}
