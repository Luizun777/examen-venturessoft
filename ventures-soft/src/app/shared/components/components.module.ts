import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { GenericSelectComponent } from './generic-select/generic-select.component';
import { MaterialsModule } from '@core/materials/materials.module';

const componentes = [HeaderComponent, FooterComponent, GenericSelectComponent];

@NgModule({
  declarations: componentes,
  exports: componentes,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule, MaterialsModule],
})
export class ComponentsModule {}
