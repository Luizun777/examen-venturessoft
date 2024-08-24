import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'btn-text-icon',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './btn-text-icon.component.html',
  styleUrl: './btn-text-icon.component.scss',
})
export class BtnTextIconComponent {
  @Input() color: ThemePalette = undefined;
  @Input() title: string = '';
  @Input() icon: string = 'mood';
  @Input() matBtn: boolean = true;
}
