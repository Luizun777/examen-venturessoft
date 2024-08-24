import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MenuComponent } from '../menu/menu.component';
import { MarcasComponent } from '../marcas/marcas.component';
import { DetailsComponent } from '../details/details.component';
import { BtnTextIconComponent } from '@shared/components/btn-text-icon/btn-text-icon.component';
import { TranslationService } from '@core/services/translation.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TextColorPipe } from '@shared/pipe/text-color.pipe';

@Component({
  selector: 'featur-home',
  standalone: true,
  imports: [
    CommonModule,
    MenuComponent,
    MatButtonModule,
    MarcasComponent,
    DetailsComponent,
    BtnTextIconComponent,
    TextColorPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private translationSrv = inject(TranslationService);

  home$: Observable<{ [key: string]: string }> = new Observable();

  ngOnInit(): void {
    this.home$ = this.translationSrv.getTranslationObject$('home');
  }
}
