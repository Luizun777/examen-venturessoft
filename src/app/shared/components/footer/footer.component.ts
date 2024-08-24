import { Component, inject, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { CatLanguage } from 'src/assets/catalogos/CatLanguage';
import { CatalogGeneric } from '@core/interfaces/catalogo-generico.interface';
import { CommonModule } from '@angular/common';
import { GenericSelectComponent } from '../generic-select/generic-select.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, GenericSelectComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  public translationSrv = inject(TranslationService);

  footer$: Observable<{ [key: string]: string }> = new Observable();

  catLanguage: CatalogGeneric[] = CatLanguage;

  ngOnInit(): void {
    this.footer$ = this.translationSrv.getTranslationObject$('footer');
  }

  async selectLanguage(value: any): Promise<void> {
    await this.translationSrv.loadTranslations(value);
  }
}
