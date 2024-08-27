import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Marca } from '@core/interfaces/marcas.interface';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BtnTextIconComponent } from '../btn-text-icon/btn-text-icon.component';
import { TranslationService } from '@core/services/translation.service';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    BtnTextIconComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit, OnDestroy {
  private translationSrv = inject(TranslationService);

  @Input() marca: Marca = {} as Marca;
  @Input() isCashback: boolean = true;
  backgroundImg: string = 'assets/images/no-image.webp';
  imgFloat: string = 'assets/images/no-image.webp';

  showLoaderBackground: boolean = true;
  showLoaderImgFloat: boolean = true;

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

  loaderImg(): void {
    this.backgroundImg = this.validImage(this.background);
    this.showLoaderBackground = false;
  }

  loaderImgFloat(): void {
    this.imgFloat = this.validImage(this.marca.imagen);
    this.showLoaderImgFloat = false;
  }

  validImage(image: string | undefined): string {
    return image || 'assets/images/no-image.webp';
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/no-image.webp';
  }
}
