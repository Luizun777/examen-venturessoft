import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private translationSrv = inject(TranslationService);

  async ngOnInit(): Promise<void> {
    await this.translationSrv.loadTranslations(
      this.translationSrv.getLanguageStorage
    );
  }
}
