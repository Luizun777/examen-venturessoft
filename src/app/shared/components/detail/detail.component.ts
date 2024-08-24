import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Marca } from '@core/interfaces/marcas.interface';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BtnTextIconComponent } from '../btn-text-icon/btn-text-icon.component';
import { TranslationService } from '@core/services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    BtnTextIconComponent,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit, OnDestroy {
  private translationSrv = inject(TranslationService);

  @Input() marca: Marca = {} as Marca;
  @Input() isCashback: boolean = true;

  translations: any = {};

  private translationSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.translationSub = this.translationSrv.translations.subscribe(
      (translations) => (this.translations = translations['detail'])
    );
  }

  ngOnDestroy(): void {
    this.translationSub.unsubscribe();
  }

  get background(): string | undefined {
    return this.isCashback ? this.marca.background : this.marca.imagen;
  }

  get badgeClass(): string {
    return this.isCashback ? ' card-badge' : ' coupon-badge';
  }

  get badgeTitle(): string {
    return this.isCashback
      ? this.translations.badgeCashback
      : this.translations.badgeCoupon;
  }

  get badgeIcon(): string {
    return this.isCashback ? 'local_atm' : 'card_travel';
  }
}
