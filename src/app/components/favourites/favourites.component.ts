import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, forkJoin, Observable, switchMap } from 'rxjs';
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
        // Since the api doesn't have the ability to get multiple movies by their imdb ids,
        // I will instead request each movie individually and wait for their observables to complete via the forkJoin function
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