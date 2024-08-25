import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { TextColorPipe } from '@shared/pipe/text-color.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-features-home',
  templateUrl: './features-home.component.html',
  styleUrls: ['./features-home.component.scss'],
  providers: [TextColorPipe],
})
export class FeaturesHomeComponent implements OnInit, OnDestroy {
  private translationSrv = inject(TranslationService);

  private translationSub: Subscription = new Subscription();
  translations: any = {};

  ngOnInit(): void {
    this.translationSub = this.translationSrv.translations.subscribe(
      (translations: any) => (this.translations = translations['home'])
    );
  }

  ngOnDestroy(): void {
    this.translationSub.unsubscribe();
  }
}
