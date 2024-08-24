import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Marcas } from '@core/interfaces/marcas.interface';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatTooltipModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  @Input() marca: Marcas = {} as Marcas;
}
