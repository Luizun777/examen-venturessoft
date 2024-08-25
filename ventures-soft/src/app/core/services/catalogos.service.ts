import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable, Output } from '@angular/core';
import { Categorias } from '@core/interfaces/categorias.interface';
import { HttpResponse } from '@core/interfaces/http.interface';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogosService {
  private http = inject(HttpClient);

  @Output() changeCategoria: EventEmitter<void> = new EventEmitter();

  getCategorias(): Observable<HttpResponse<Categorias[]>> {
    return this.http.get<HttpResponse<Categorias[]>>(
      `${environment.apiServer}Categorias`
    );
  }
}
