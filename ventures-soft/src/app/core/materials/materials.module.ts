import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const modulos = [
  MatFormFieldModule,
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatInputModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatListModule,
  MatProgressBarModule,
];

@NgModule({
  imports: modulos,
  exports: modulos,
})
export class MaterialsModule {}
