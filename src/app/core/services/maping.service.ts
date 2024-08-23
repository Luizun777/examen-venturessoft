import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapingService {
  acentoDescripcion(menuItems: any): any {
    return menuItems.map((menuItem: any) => {
      const descripcion = menuItem.descripción;
      delete menuItem.descripción;
      return {
        ...menuItem,
        descripcion,
      };
    });
  }
}
