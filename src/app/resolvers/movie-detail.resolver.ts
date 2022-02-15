import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MovieDetail } from '../models/movie-detail';
import { MovieService } from '../services/movie.service';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailResolver implements Resolve<MovieDetail | undefined> {
  constructor(private movieService: MovieService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<MovieDetail | undefined> {
    const imdbId = route.paramMap.get('id');

    if (!imdbId) {
      return of(undefined);
    }

    return this.movieService.getByImdbID(imdbId);
  }
}
