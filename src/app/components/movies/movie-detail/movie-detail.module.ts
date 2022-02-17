import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PipesModule } from '../../../pipes/pipes.module';
import { MovieDetailComponent } from './movie-detail.component';

@NgModule({
  declarations: [MovieDetailComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    PipesModule,
  ],
  exports: [MovieDetailComponent],
})
export class MovieDetailModule {}
