import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FeaturesHomeComponent } from './features-home/features-home.component';
import { TextColorPipe } from '@shared/pipe/text-color.pipe';
import { MaterialsModule } from '@core/materials/materials.module';
import { TablaComponent } from './tabla/tabla.component';
import { ComponentsModule } from '@shared/components/components.module';
import { MenuComponent } from './menu/menu.component';
import { MarcasComponent } from './marcas/marcas.component';
import { DetailsComponent } from './details/details.component';

const componets = [
  FeaturesHomeComponent,
  TablaComponent,
  MenuComponent,
  MarcasComponent,
  DetailsComponent
];

@NgModule({
  declarations: componets,
  exports: componets,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TextColorPipe,
    MaterialsModule,
    ComponentsModule,
  ],
})
export class FeaturesModule {}
