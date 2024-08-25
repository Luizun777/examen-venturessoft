import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CatalogGeneric } from '@core/interfaces/catalogo-generico.interface';
import { TranslationService } from '@core/services/translation.service';
import { Subscription } from 'rxjs';
import { CatLanguage } from 'src/assets/catalogos/CatLanguage';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  public translationSrv = inject(TranslationService);

  private translationSub: Subscription = new Subscription();
  translations: any = {};

  catLanguage: CatalogGeneric[] = CatLanguage;

  ngOnInit(): void {
    this.translationSub = this.translationSrv.translations.subscribe(
      (translations: any) => (this.translations = translations['footer'])
    );
  }

  ngOnDestroy(): void {
    this.translationSub.unsubscribe();
  }

  async selectLanguage(value: any): Promise<void> {
    await this.translationSrv.loadTranslations(value);
  }
}
