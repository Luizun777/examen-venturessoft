import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MenuComponent } from '../menu/menu.component';
import { MarcasComponent } from "../marcas/marcas.component";

@Component({
  selector: 'featur-home',
  standalone: true,
  imports: [MenuComponent, MatButtonModule, MarcasComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
