import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MenuComponent } from '../menu/menu.component';
import { MarcasComponent } from "../marcas/marcas.component";
import { DetailsComponent } from "../details/details.component";

@Component({
  selector: 'featur-home',
  standalone: true,
  imports: [MenuComponent, MatButtonModule, MarcasComponent, DetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
