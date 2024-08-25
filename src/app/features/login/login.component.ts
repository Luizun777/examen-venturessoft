import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { GenericSelectComponent } from '@shared/components/generic-select/generic-select.component';
import { TranslationService } from '@core/services/translation.service';
import { Subscription } from 'rxjs';
import { CatLanguage } from 'src/assets/catalogos/CatLanguage';
import { CatalogGeneric } from '@core/interfaces/catalogo-generico.interface';
import { AlertService } from '@core/services/alert.service';
import { Router } from '@angular/router';
import { environment } from '@environment/environment';

@Component({
  selector: 'featur-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    GenericSelectComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
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
      confirmPassword: [''],
    });
    if (!this.isLogin) {
      this.authForm
        .get('confirmPassword')
        ?.addValidators([Validators.required]);
    }
    this.authForm.updateValueAndValidity();
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
