import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { GenericSelectComponent } from './generic-select/generic-select.component';
import { MaterialsModule } from '@core/materials/materials.module';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { DetailRowComponent } from './detail-row/detail-row.component';
import { DetailGridComponent } from './detail-grid/detail-grid.component';
import { ChangeGridComponent } from './change-grid/change-grid.component';
import { BtnTextIconComponent } from './btn-text-icon/btn-text-icon.component';

const componentes = [
  HeaderComponent,
  FooterComponent,
  GenericSelectComponent,
  MenuItemComponent,
  DetailRowComponent,
  DetailGridComponent,
  ChangeGridComponent,
  BtnTextIconComponent
];

@NgModule({
  declarations: componentes,
  exports: componentes,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialsModule,
  ],
})
export class ComponentsModule {}
