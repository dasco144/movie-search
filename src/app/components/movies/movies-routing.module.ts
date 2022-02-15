import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailResolver } from '../../resolvers/movie-detail.resolver';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesComponent } from './movies.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MoviesComponent },
  {
    path: ':id',
    component: MovieDetailComponent,
    resolve: {
      movie: MovieDetailResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
