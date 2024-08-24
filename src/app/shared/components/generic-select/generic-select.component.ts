import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CatalogGeneric } from '@core/interfaces/catalogo-generico.interface';

@Component({
  selector: 'app-generic-select',
  standalone: true,
  imports: [MatSelectModule, MatIconModule],
  templateUrl: './generic-select.component.html',
  styleUrl: './generic-select.component.scss',
})
export class GenericSelectComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() currenValue: number | string = 0;
  @Input() optionList: CatalogGeneric[] = [];
  @Output() changeOption: EventEmitter<any> = new EventEmitter();

  changeValue(evento: any): void {
    this.changeOption.emit(evento);
  }
}
