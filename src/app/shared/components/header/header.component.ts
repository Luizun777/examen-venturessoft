import { Component } from '@angular/core';
import { BtnTextIconComponent } from '../btn-text-icon/btn-text-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BtnTextIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
