import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-change-grid',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './change-grid.component.html',
  styleUrl: './change-grid.component.scss',
})
export class ChangeGridComponent {
  @Input() showGrid: boolean = true;
  @Output() emitChange: EventEmitter<boolean> = new EventEmitter();

  changeGrid(isGrid: boolean): void {
    this.emitChange.emit(isGrid);
  }
}
