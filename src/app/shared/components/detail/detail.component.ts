import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Marca } from '@core/interfaces/marcas.interface';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BtnTextIconComponent } from "../btn-text-icon/btn-text-icon.component";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatTooltipModule, BtnTextIconComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  @Input() marca: Marca = {} as Marca;
  @Input() isCashback: boolean = true;

  get background(): string | undefined {
    return this.isCashback ? this.marca.background : this.marca.imagen;
  }

  get badgeClass(): string {
    return this.isCashback ? ' card-badge' : ' coupon-badge';
  }

  get badgeTitle(): string {
    return this.isCashback ? 'Cashback' : 'Instant Coupon';
  }

  get badgeIcon(): string {
    return this.isCashback ? 'local_atm' : 'card_travel';
  }
}
