import { Component, inject, OnInit } from '@angular/core';
import { BtnTextIconComponent } from '../btn-text-icon/btn-text-icon.component';
import { Observable } from 'rxjs';
import { TranslationService } from '@core/services/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, BtnTextIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private translationSrv = inject(TranslationService);

  header$: Observable<{ [key: string]: string }> = new Observable();

  ngOnInit(): void {
    this.header$ = this.translationSrv.getTranslationObject$('header');
  }
}
