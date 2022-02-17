import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule, MockPipe, MockService } from 'ng-mocks';
import { Observable, Subject } from 'rxjs';

import { MovieDetail } from '../../../models/movie-detail';
import { MoviePosterPipe } from '../../../pipes/movie-poster.pipe';
import { MovieService } from '../../../services/movie.service';
import { getNewMovieDetail } from '../../../testing/helpers.spec';
import { MoviesGridComponent } from './movies-grid.component';

describe('MoviesGridComponent', () => {
  let component: MoviesGridComponent;
  let fixture: ComponentFixture<MoviesGridComponent>;

  let movieService: MovieService;
  let router: Router;
  let movieDetails: MovieDetail[];

  let userFavouritesSubj: Subject<string[]>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesGridComponent, MockPipe(MoviePosterPipe)],
      imports: [
        RouterTestingModule,
        MockModule(MatIconModule),
        MockModule(MatTooltipModule),
        MockModule(MatCardModule),
        MockModule(MatButtonModule),
      ],
      providers: [
        { provide: MovieService, useValue: MockService(MovieService) },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesGridComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    movieService = TestBed.inject(MovieService);
    spyOn(movieService, 'toggleFavourite');

    movieDetails = [];

    for (let i = 1; i < 10; i++) {
      movieDetails.push(getNewMovieDetail(i));
    }

    userFavouritesSubj = new Subject<string[]>();

    movieService.userFavourites$ = userFavouritesSubj;

    component.movies = movieDetails;

    fixture.detectChanges();

    userFavouritesSubj.next([]);
  });

  it('should setup favourites observable', fakeAsync(() => {
    expect(component.favourites$).toEqual(jasmine.any(Observable));

    const favMovieIds = movieDetails
      .slice(0, 3)
      .map((favMovie) => favMovie.imdbID);

    let favourites: string[] = [];
    component.favourites$.subscribe((res) => (favourites = res));

    userFavouritesSubj.next(favMovieIds);

    tick();

    expect(favourites).toEqual(favMovieIds);
  }));

  it('should navigate to movie detail route on open icon click', () => {
    const movie = fixture.debugElement.query(By.css('.movie'));
    const navigateIcon = movie.queryAll(By.directive(MatIcon))[1];

    navigateIcon.triggerEventHandler('click', null);

    expect(router.navigate).toHaveBeenCalledWith([
      '/movies',
      movieDetails[0].imdbID,
    ]);
  });

  it('should toggle favourite on star icon click', fakeAsync(() => {
    const movie = fixture.debugElement.query(By.css('.movie'));
    let favouriteIcon = movie.queryAll(By.directive(MatIcon))[0];
    let favouriteIconEl = favouriteIcon.nativeElement as HTMLElement;

    expect(favouriteIconEl.textContent?.trim()).toEqual('star_outline');

    favouriteIcon.triggerEventHandler('click', null);
    userFavouritesSubj.next([movieDetails[0].imdbID]);

    tick();
    fixture.detectChanges();

    favouriteIcon = movie.queryAll(By.directive(MatIcon))[0];
    favouriteIconEl = favouriteIcon.nativeElement as HTMLElement;

    expect(favouriteIconEl.textContent?.trim()).toEqual('star');
    expect(movieService.toggleFavourite).toHaveBeenCalledWith(
      movieDetails[0].imdbID
    );
  }));
});
