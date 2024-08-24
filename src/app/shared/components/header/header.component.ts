import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BtnTextIconComponent } from '../btn-text-icon/btn-text-icon.component';
import { Observable, Subscription } from 'rxjs';
import { TranslationService } from '@core/services/translation.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '@environment/environment';
import { AlertService } from '@core/services/alert.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, BtnTextIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private translationSrv = inject(TranslationService);
  private alertSrv = inject(AlertService);
  public router = inject(Router);

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
}
