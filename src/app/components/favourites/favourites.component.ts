import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { MovieDetail } from '../../models/movie-detail';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  favouriteMovies$!: Observable<MovieDetail[]>;

  constructor(
    private router: Router,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.favouriteMovies$ = this.movieService.userFavourites$.pipe(
      switchMap((favourites) => {
        // If we have no favourites just return an empty array
        if (!favourites.length) {
          return of([]);
        }

        // Since the api doesn't have the ability to get multiple movies by their imdb ids,
        // I will instead request each movie individually and wait for their observables to complete via the forkJoin function
        // Ideally, the backend would have an api to request multiple movies via their imdb ids in a single request
        const favouriteObs = favourites.map((favourite) =>
          this.movieService.getByImdbID(favourite)
        );

        return forkJoin(favouriteObs).pipe(
          catchError(() => {
            throw new Error('Error retrieving favourited movies');
          })
        );
      }),
      catchError((error: Error) => {
        // Display a snackbar with an error message
        this.snackBar.open(error.message, undefined, {
          duration: 5000,
          verticalPosition: 'top',
        });
        // Navigate back to home on an error
        void this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        return [];
      })
    );
  }
}
