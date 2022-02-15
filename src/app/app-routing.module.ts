import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./components/movies/movies.module').then((m) => m.MoviesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
