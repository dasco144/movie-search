import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, delay, map, Observable, switchMap, tap } from 'rxjs';
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
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movies$ = this.activatedRoute.queryParams.pipe(
      map((params) => {
        if (!params['search']) {
          throw new Error('Invalid search term');
        }
        return params['search'];
      }),
      switchMap((search) => this.movieService.search(search)),
      map((result) => {
        if (!result.Search?.length) {
          this.snackBar.open('No results found', undefined, {
            duration: 5000,
            verticalPosition: 'top',
          });
          return [];
        }

        return result.Search;
      }),
      catchError((error: Error) => {
        this.snackBar.open(error.message, undefined, {
          duration: 5000,
          verticalPosition: 'top',
        });
        void this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        return [];
      })
    );
  }
}
