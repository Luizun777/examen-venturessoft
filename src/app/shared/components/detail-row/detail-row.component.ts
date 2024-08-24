import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BtnTextIconComponent } from '../btn-text-icon/btn-text-icon.component';
import { MatListModule } from '@angular/material/list';
import { Marca } from '@core/interfaces/marcas.interface';
import { TranslationService } from '@core/services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-row',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    BtnTextIconComponent,
    MatListModule,
  ],
  templateUrl: './detail-row.component.html',
  styleUrl: './detail-row.component.scss',
})
export class DetailRowComponent implements OnInit, OnDestroy {
  private translationSrv = inject(TranslationService);

  @Input() marca: Marca = {} as Marca;

  private translationSub: Subscription = new Subscription();
  translations: any = {};

  ngOnInit(): void {
    this.translationSub = this.translationSrv.translations.subscribe(
      (translations) => (this.translations = translations['detail'])
    );
  }

  ngOnDestroy(): void {
    this.translationSub.unsubscribe();
  }
}
