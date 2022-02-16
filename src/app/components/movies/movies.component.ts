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

  moviesCount = 0;

  // api page size is set to 10
  pageSize = 10;

  constructor(
    private movieService: MovieService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load the first page on initialize
    this.search();
  }

  search(pageNo?: number): void {
    // Get the query params from the activatedRoute
    this.movies$ = this.activatedRoute.queryParams.pipe(
      map((params) => {
        // If no search query parameter or falsy value provided, then throw error to be handled by catch error below
        if (!params['search']) {
          throw new Error('Invalid search term');
        }
        return params['search'];
      }),
      // Search for movies using the query param search
      switchMap((search) => this.movieService.search(search, pageNo)),
      map((result) => {
        // If we get no results then display a toast and return an empty array
        if (!result.Search?.length) {
          return [];
        }

        // Set the count total count for the paging
        this.moviesCount = result.totalResults;

        return result.Search;
      }),
      catchError((error: Error) => {
        // Catch any errors and display the error message in a snack bar
        this.snackBar.open(error.message, undefined, {
          duration: 5000,
          verticalPosition: 'top',
        });
        // Navigate back to the search page
        void this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        return [];
      })
    );
  }
}
