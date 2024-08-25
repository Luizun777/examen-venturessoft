import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categorias } from '@core/interfaces/categorias.interface';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
  @Input() item: Categorias = {} as Categorias;
  @Output() clickItemEvent: EventEmitter<number> = new EventEmitter();
}
