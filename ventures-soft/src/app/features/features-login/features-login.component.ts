import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogGeneric } from '@core/interfaces/catalogo-generico.interface';
import { AlertService } from '@core/services/alert.service';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environment/environment';
import { Subscription } from 'rxjs';
import { CatLanguage } from 'src/assets/catalogos/CatLanguage';

@Component({
  selector: 'app-features-login',
  templateUrl: './features-login.component.html',
  styleUrls: ['./features-login.component.scss'],
})
export class FeaturesLoginComponent implements OnInit, OnDestroy {
  public translationSrv = inject(TranslationService);
  private alertSrv = inject(AlertService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  authForm: FormGroup = new FormGroup({});
  isLogin: boolean = true;

  private translationSub: Subscription = new Subscription();
  translations: any = {};

  catLanguage: CatalogGeneric[] = CatLanguage;

  ngOnInit(): void {
    this.translationSub = this.translationSrv.translations.subscribe(
      (translations: any) =>
        (this.translations = {
          ...translations['footer'],
          ...translations['login'],
        })
    );
    this.formInit();
  }

  ngOnDestroy(): void {
    this.translationSub.unsubscribe();
  }

  formInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', this.isLogin ? [] : [Validators.required]],
    });
  }

  async selectLanguage(value: any): Promise<void> {
    await this.translationSrv.loadTranslations(value);
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.formInit();
  }

  get passwordMatchValidator(): boolean {
    if (this.isLogin) {
      return false;
    }
    const { password, confirmPassword } = this.authForm.value;
    return password !== confirmPassword;
  }

  onSubmit() {
    if (this.authForm.valid) {
      if (this.isLogin) {
        this.redirectTo(this.translations['login-login-success']);
      } else if (this.authForm.valid && !this.passwordMatchValidator) {
        this.redirectTo(this.translations['login-register-success']);
      } else {
        this.alertSrv.alertError(
          this.translations['login-passwordErrorMachHtml']
        );
      }
      return;
    }
    this.alertSrv.alertError(
      this.translations[
        this.isLogin ? 'login-login-error' : 'login-register-error'
      ]
    );
  }

  redirectTo(message: string): void {
    const { email } = this.authForm.value;
    this.alertSrv.alertSuccess(message);
    localStorage.setItem(environment.emailKey, email);
    this.router.navigate(['/home']);
  }
}
