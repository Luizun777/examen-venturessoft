import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FeaturesHomeComponent } from './features-home/features-home.component';
import { TextColorPipe } from '@shared/pipe/text-color.pipe';

@NgModule({
  declarations: [FeaturesHomeComponent],
  exports: [FeaturesHomeComponent],
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule, TextColorPipe],
})
export class FeaturesModule {}
