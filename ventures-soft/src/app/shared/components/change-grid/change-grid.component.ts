import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-change-grid',
  templateUrl: './change-grid.component.html',
  styleUrls: ['./change-grid.component.scss'],
})
export class ChangeGridComponent {
  @Input() showGrid: boolean = true;
  @Output() emitChange: EventEmitter<boolean> = new EventEmitter();

  changeGrid(isGrid: boolean): void {
    this.emitChange.emit(isGrid);
  }
}
