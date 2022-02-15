import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesGridComponent } from './movies-grid/movies-grid.component';
import { PipesModule } from '../../pipes/pipes.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [MoviesGridComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    PipesModule,
  ],
  exports: [MoviesGridComponent],
})
export class CommonComponentsModule {}
