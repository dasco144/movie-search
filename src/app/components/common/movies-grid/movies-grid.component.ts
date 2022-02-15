import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, shareReplay } from 'rxjs';
import { MovieDetail } from '../../../models/movie-detail';
import { MovieSearchResult } from '../../../models/movie-search-result';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.scss'],
})
export class MoviesGridComponent {
  @Input()
  movies: MovieSearchResult[] | MovieDetail[] = [];

  favourites$!: Observable<string[]>;

  constructor(private router: Router, private movieService: MovieService) {}

  ngOnInit(): void {
    this.favourites$ = this.movieService.userFavourites$.pipe(shareReplay(1));
  }

  goToMovie(movie: MovieSearchResult): void {
    void this.router.navigate(['/movies', movie.imdbID]);
  }

  toggleFavourite(id: string): void {
    this.movieService.toggleFavourite(id);
  }
}