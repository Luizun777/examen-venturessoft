import { Component } from '@angular/core';
import { LoginComponent as FeaturesLoginComponent } from '@features/login/login.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FeaturesLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {}
