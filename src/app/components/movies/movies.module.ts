import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CommonComponentsModule } from '../common/common-components.module';
import { MovieDetailModule } from './movie-detail/movie-detail.module';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';

@NgModule({
  declarations: [MoviesComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MovieDetailModule,
    CommonComponentsModule,
  ],
})
export class MoviesModule {}
