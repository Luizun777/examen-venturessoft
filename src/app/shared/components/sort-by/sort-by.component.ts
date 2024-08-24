import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { CatalogGeneric } from '@core/interfaces/catalogo-generico.interface';

@Component({
  selector: 'app-sort-by',
  standalone: true,
  imports: [MatSelectModule],
  templateUrl: './sort-by.component.html',
  styleUrl: './sort-by.component.scss',
})
export class SortByComponent {
  @Input() title: string = 'SORT BY';
  @Input() valueSort: number = 1;
  @Input() optionList: CatalogGeneric[] = [];
  @Output() changeOption: EventEmitter<number> = new EventEmitter();

  changeValue(evento: number): void {
    this.changeOption.emit(evento);
  }
}
