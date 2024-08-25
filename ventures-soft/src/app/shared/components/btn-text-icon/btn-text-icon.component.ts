import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-btn-text-icon',
  templateUrl: './btn-text-icon.component.html',
  styleUrls: ['./btn-text-icon.component.scss'],
})
export class BtnTextIconComponent {
  @Input() color: ThemePalette = undefined;
  @Input() title: string = '';
  @Input() icon: string = 'mood';
  @Input() matBtn: boolean = true;

}
