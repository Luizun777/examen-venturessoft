import { Component } from '@angular/core';
import { MenuComponent } from "@shared/components/menu/menu.component";

@Component({
  selector: 'featur-home',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
