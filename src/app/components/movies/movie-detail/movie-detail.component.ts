import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { MovieDetail } from '../../../models/movie-detail';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movie!: MovieDetail;

  isFavourited$!: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movie = this.activatedRoute.snapshot.data['movie'];

    this.isFavourited$ = this.movieService.userFavourites$.pipe(
      map((favourites) => favourites.includes(this.movie.imdbID)),
      shareReplay(1)
    );
  }

  toggleFavourite(): void {
    this.movieService.toggleFavourite(this.movie.imdbID);
  }
}
