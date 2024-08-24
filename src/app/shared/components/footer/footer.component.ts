import { Component, inject } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TranslationService } from '@core/services/translation.service';
import { CatLanguage } from '@shared/catalogos/CatLanguage';
import { CatalogGeneric } from '@core/interfaces/catalogo-generico.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public translationSrv = inject(TranslationService);

  catLanguage: CatalogGeneric[] = CatLanguage;

  async loadLanguage(language: string) {
    await this.translationSrv.loadTranslations(language);
  }

  selectLanguage({ value }: MatSelectChange): void {
    this.loadLanguage(value);
  }
}
