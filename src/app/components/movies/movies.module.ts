import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MoviesComponent } from './movies.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MovieDetailModule } from './movie-detail/movie-detail.module';
import { CommonComponentsModule } from '../common/common-components.module';

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
