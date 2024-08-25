import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  translations = new BehaviorSubject<{
    [key: string]: string | { [key: string]: any };
  }>({});
  currentTranslations = this.translations.asObservable();

  async loadTranslations(language: string) {
    try {
      const translations = await import(
        `../../../assets/i18n/${language}.json`
      );
      this.translations.next(translations.default);
      this.setLanguageStorage(language);
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  }

  private setLanguageStorage(language: string): void {
    return localStorage.setItem(environment.languageKey, language);
  }

  get getLanguageStorage(): string {
    const getLanguage = localStorage.getItem(environment.languageKey);
    if (getLanguage) {
      return getLanguage;
    }
    this.setLanguageStorage(environment.languageDefault);
    return environment.languageDefault;
  }

  private getTranslationObject(
    key: string,
    translations: { [key: string]: any }
  ): any {
    return key
      .split('.')
      .reduce(
        (obj, k) => (obj && obj[k] !== undefined ? obj[k] : null),
        translations
      );
  }

  getTranslationObject$(key: string): Observable<any> {
    return this.currentTranslations.pipe(
      map((translations) => this.getTranslationObject(key, translations))
    );
  }

  async loadCatalogo(language: string, folder: string): Promise<any> {
    try {
      const translations = await import(
        `../../../assets/i18n/${folder}/${language}.json`
      );
      return translations.default;
    } catch {
      return null;
    }
  }
}
