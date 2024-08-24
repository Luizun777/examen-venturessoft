import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MenuComponent } from '../menu/menu.component';
import { MarcasComponent } from '../marcas/marcas.component';
import { DetailsComponent } from '../details/details.component';
import { BtnTextIconComponent } from '@shared/components/btn-text-icon/btn-text-icon.component';

@Component({
  selector: 'featur-home',
  standalone: true,
  imports: [
    MenuComponent,
    MatButtonModule,
    MarcasComponent,
    DetailsComponent,
    BtnTextIconComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
