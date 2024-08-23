import { Component, EventEmitter, Input, input, Output, ViewEncapsulation } from '@angular/core';
import { Categorias } from '@core/interfaces/categorias.interface';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'menu-item',
  standalone: true,
  imports: [MatChipsModule, CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MenuItemComponent {
  @Input() item: Categorias = {} as Categorias;
  @Output() clickItemEvent: EventEmitter<number> = new EventEmitter();
}
