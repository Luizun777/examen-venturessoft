import {
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Marca } from '@core/interfaces/marcas.interface';
import { TranslationService } from '@core/services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-grid',
  templateUrl: './detail-grid.component.html',
  styleUrls: ['./detail-grid.component.scss'],
})
export class DetailGridComponent implements OnInit, OnDestroy {
  private translationSrv = inject(TranslationService);

  @Input() marca: Marca = {} as Marca;
  @Input() isCashback: boolean = true;

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
}
