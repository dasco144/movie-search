import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesGridComponent } from './movies-grid/movies-grid.component';
import { PipesModule } from '../../pipes/pipes.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

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
