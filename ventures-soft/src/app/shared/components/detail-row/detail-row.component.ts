import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Marca } from '@core/interfaces/marcas.interface';
import { TranslationService } from '@core/services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-row',
  templateUrl: './detail-row.component.html',
  styleUrls: ['./detail-row.component.scss'],
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
