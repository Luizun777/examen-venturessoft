import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent]
})
export default class HomeModule {}
