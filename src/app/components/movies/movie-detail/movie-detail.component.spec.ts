import {
  ComponentFixture,
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule, MockService } from 'ng-mocks';
import { Observable, of, Subject } from 'rxjs';
import { MovieDetail } from '../../../models/movie-detail';
import { PipesModule } from '../../../pipes/pipes.module';
import { MovieService } from '../../../services/movie.service';
import { getNewMovieDetail } from '../../../testing/helpers.spec';

import { MovieDetailComponent } from './movie-detail.component';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  let activatedRoute: ActivatedRoute;
  let movieService: MovieService;
  let movie: MovieDetail;

  let userFavouritesSubj: Subject<string[]>;

  beforeEach(async () => {
    userFavouritesSubj = new Subject<string[]>();

    await TestBed.configureTestingModule({
      declarations: [MovieDetailComponent],
      imports: [
        RouterTestingModule,
        MockModule(MatSnackBarModule),
        MockModule(MatCardModule),
        MockModule(MatButtonModule),
        MockModule(MatIconModule),
        MockModule(MatListModule),
        MockModule(MatTooltipModule),
        MockModule(PipesModule),
      ],
      providers: [
        {
          provide: MovieService,
          useValue: MockService(MovieService),
        },
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;

    movie = getNewMovieDetail(1);

    activatedRoute = TestBed.inject(ActivatedRoute);
    const snapshot = MockService(ActivatedRouteSnapshot);
    snapshot.data = { movie };
    activatedRoute.snapshot = snapshot;

    movieService = TestBed.inject(MovieService);
    spyOn(movieService, 'toggleFavourite');

    movieService.userFavourites$ = userFavouritesSubj;

    fixture.detectChanges();

    userFavouritesSubj.next([]);
  });

  it('should setup movie and favourite observable', fakeAsync(() => {
    expect(component.movie).toBe(movie);
    expect(component.isFavourited$).toEqual(jasmine.any(Observable));
  }));

  it('should toggle favourite for the movie', fakeAsync(() => {
    const favouriteButton = fixture.debugElement.query(By.directive(MatButton));

    favouriteButton.triggerEventHandler('click', null);

    expect(movieService.toggleFavourite).toHaveBeenCalledWith(movie.imdbID);
  }));

  it('should update button icon based on whether it is in favourites or not', fakeAsync(() => {
    fixture.detectChanges();
    fixture.whenStable();
    flushMicrotasks();

    const favouriteButton = fixture.debugElement.query(By.directive(MatButton));

    let iconEl = favouriteButton.query(By.directive(MatIcon))
      .nativeElement as HTMLElement;

    expect(iconEl.textContent?.trim()).toEqual('star_outline');

    userFavouritesSubj.next([movie.imdbID]);
    tick();
    fixture.detectChanges();

    iconEl = favouriteButton.query(By.directive(MatIcon))
      .nativeElement as HTMLElement;

    expect(iconEl.textContent?.trim()).toEqual('star');
  }));
});
