import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MoviesComponent } from './movies.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@NgModule({
  declarations: [MoviesComponent, MovieDetailComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
})
export class MoviesModule {}
