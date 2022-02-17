import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PipesModule } from '../../pipes/pipes.module';
import { MoviesGridComponent } from './movies-grid/movies-grid.component';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';

@NgModule({
  declarations: [MoviesGridComponent, ThemeSelectorComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    PipesModule,
  ],
  exports: [MoviesGridComponent, ThemeSelectorComponent],
})
export class CommonComponentsModule {}
