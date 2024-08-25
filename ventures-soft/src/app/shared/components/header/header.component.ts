import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environment/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private translationSrv = inject(TranslationService);
  private alertSrv = inject(AlertService);
  private router = inject(Router);

  private translationSub: Subscription = new Subscription();
  translations: any = {};

  ngOnInit(): void {
    this.translationSub = this.translationSrv.translations.subscribe(
      (translations: any) =>
        (this.translations = {
          ...translations['header'],
          ...translations['login'],
        })
    );
  }

  ngOnDestroy(): void {
    this.translationSub.unsubscribe();
  }

  get userSession(): string {
    return localStorage.getItem(environment.emailKey) ?? '';
  }

  logOut(): void {
    localStorage.removeItem(environment.emailKey);
    this.alertSrv.alertSuccess(this.translations['header-loginOutMessage']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
