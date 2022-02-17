import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule, MockService } from 'ng-mocks';
import { Observable, of, Subject, throwError } from 'rxjs';

import { MovieDetail } from '../../models/movie-detail';
import { MovieService } from '../../services/movie.service';
import { getNewMovieDetail } from '../../testing/helpers.spec';
import { CommonComponentsModule } from '../common/common-components.module';
import { MoviesGridComponent } from '../common/movies-grid/movies-grid.component';
import { FavouritesRoutingModule } from './favourites-routing.module';
import { FavouritesComponent } from './favourites.component';

describe('FavouritesComponent', () => {
  let fixture: ComponentFixture<FavouritesComponent>;

  let activatedRoute: ActivatedRoute;
  let matSnackBar: MatSnackBar;
  let getSpy: jasmine.Spy<(id: string) => Observable<MovieDetail>>;
  let router: Router;

  let movieDetails: MovieDetail[];

  let userFavouritesSubj: Subject<string[]>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavouritesComponent],
      imports: [
        RouterTestingModule,
        MockModule(MatSnackBarModule),
        MockModule(MatProgressSpinnerModule),
        MockModule(FavouritesRoutingModule),
        MockModule(CommonComponentsModule),
      ],
      providers: [
        { provide: MatSnackBar, useValue: MockService(MatSnackBar) },
        { provide: MovieService, useValue: MockService(MovieService) },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesComponent);

    activatedRoute = TestBed.inject(ActivatedRoute);

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    matSnackBar = TestBed.inject(MatSnackBar);
    spyOn(matSnackBar, 'open');

    movieDetails = [];

    for (let i = 1; i <= 5; i++) {
      movieDetails.push(getNewMovieDetail(i));
    }

    const movieService = TestBed.inject(MovieService);
    getSpy = spyOn(movieService, 'getByImdbID').and.returnValues(
      ...movieDetails.map((movieDetail) => of(movieDetail))
    );

    userFavouritesSubj = new Subject<string[]>();

    movieService.userFavourites$ = userFavouritesSubj;
  });

  it('should display favourites from service', fakeAsync(() => {
    fixture.detectChanges();

    const favourites = movieDetails.slice(0, 3);

    userFavouritesSubj.next(
      favourites.map((movieDetail) => movieDetail.imdbID)
    );

    tick();
    fixture.detectChanges();

    const moviesGrid: MoviesGridComponent = fixture.debugElement.query(
      By.directive(MoviesGridComponent)
    ).componentInstance;

    expect(moviesGrid.movies).toEqual(favourites);
  }));

  it('should display empty message when no favourites set', fakeAsync(() => {
    fixture.detectChanges();

    userFavouritesSubj.next([]);

    tick();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.directive(MoviesGridComponent))
    ).toBeNull();
    expect(
      fixture.debugElement.query(By.css('.headline')).nativeElement.textContent
    ).toContain('No favourites set');
  }));

  it('should handle error retrieving favourites', fakeAsync(() => {
    const error = new Error('invalid value');

    getSpy.and.returnValues(throwError(() => error));

    fixture.detectChanges();

    const favourites = movieDetails.slice(0, 3);

    userFavouritesSubj.next(
      favourites.map((movieDetail) => movieDetail.imdbID)
    );

    tick();
    fixture.detectChanges();

    const moviesGrid = fixture.debugElement.query(
      By.directive(MoviesGridComponent)
    );

    expect(moviesGrid).toBeNull();
    expect(matSnackBar.open).toHaveBeenCalledWith(
      'Error retrieving favourited movies',
      undefined,
      {
        duration: 5000,
        verticalPosition: 'top',
      }
    );
    expect(router.navigate).toHaveBeenCalledWith(['../'], {
      relativeTo: activatedRoute,
    });
  }));
});
