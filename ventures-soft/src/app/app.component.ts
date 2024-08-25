import { Component, inject, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private translationSrv = inject(TranslationService);

  async ngOnInit(): Promise<void> {
    await this.translationSrv.loadTranslations(
      this.translationSrv.getLanguageStorage
    );
  }
}
