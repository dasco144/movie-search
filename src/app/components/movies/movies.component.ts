import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { MovieSearchResult } from '../../models/movie-search-result';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies$!: Observable<MovieSearchResult[]>;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movies$ = this.activatedRoute.queryParams.pipe(
      switchMap((params) => this.movieService.search(params['search'])),
      map((result) => result.Search)
    );
  }

  goToMovie(movie: MovieSearchResult): void {
    void this.router.navigate([movie.imdbID], {
      relativeTo: this.activatedRoute,
    });
  }

  addToFavourites(): void {}
}
