import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TableCard } from '@core/interfaces/table-card.interface';
import { TranslationService } from '@core/services/translation.service';
import { Subscription } from 'rxjs';
import { CatTablaHeader } from 'src/assets/catalogos/CatTable';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent implements OnInit, OnDestroy {
  private translationSrv = inject(TranslationService);

  displayedColumns: string[] = CatTablaHeader;
  dataSource: TableCard[] = [];

  private translationSub: Subscription = new Subscription();
  translations: any = {};

  ngOnInit(): void {
    this.translationSub = this.translationSrv.translations.subscribe(
      async (translations: any) => {
        this.translations = translations['tabla'];

        const catalago = await this.translationSrv.loadCatalogo(
          translations['languiaje'],
          'catTable'
        );
        if (catalago) {
          this.dataSource = catalago;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.translationSub.unsubscribe();
  }
}
