import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MenuComponent } from "@shared/components/menu/menu.component";

@Component({
  selector: 'featur-home',
  standalone: true,
  imports: [MenuComponent, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
