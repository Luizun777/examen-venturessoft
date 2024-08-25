import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TableCard } from '@core/interfaces/table-card.interface';
import { TranslationService } from '@core/services/translation.service';
import { Subscription } from 'rxjs';
import {
  CatTablaEn,
  CatTablaEs,
  CatTablaHeader,
} from 'src/assets/catalogos/CatTable';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss',
})
export class TablaComponent implements OnInit, OnDestroy {
  private translationSrv = inject(TranslationService);

  displayedColumns: string[] = CatTablaHeader;
  dataSource: TableCard[] = [];

  private translationSub: Subscription = new Subscription();
  translations: any = {};

  ngOnInit(): void {
    this.translationSub = this.translationSrv.translations.subscribe(
      (translations: any) => {
        this.translations = translations['tabla'];
        this.dataSource =
          translations['languiaje'] === 'es' ? CatTablaEs : CatTablaEn;
      }
    );
  }

  ngOnDestroy(): void {
    this.translationSub.unsubscribe();
  }
}
