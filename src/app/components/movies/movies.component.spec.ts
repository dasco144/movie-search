import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule, MockService } from 'ng-mocks';
import { Observable, of, throwError } from 'rxjs';
import {
  MovieSearchResponse,
  MovieSearchResult,
} from '../../models/movie-detail';
import { MovieService } from '../../services/movie.service';
import { getNewMovieSearchResult } from '../../testing/helpers.spec';
import { CommonComponentsModule } from '../common/common-components.module';
import { MovieDetailModule } from './movie-detail/movie-detail.module';
import { MoviesRoutingModule } from './movies-routing.module';

import { MoviesComponent } from './movies.component';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  let activatedRoute: ActivatedRoute;
  let matSnackBar: MatSnackBar;
  let searchSpy: jasmine.Spy<
    (searchQuery: string, pageNo?: number) => Observable<MovieSearchResponse>
  >;
  let router: Router;

  let movieSearchResults: MovieSearchResult[];
  let movieSearchResponse: MovieSearchResponse;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MockModule(MoviesRoutingModule),
        MockModule(MatProgressSpinnerModule),
        MockModule(MatPaginatorModule),
        MockModule(MovieDetailModule),
        MockModule(CommonComponentsModule),
      ],
      providers: [
        { provide: MatSnackBar, useValue: MockService(MatSnackBar) },
        { provide: MovieService, useValue: MockService(MovieService) },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);

    activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.queryParams = of({ search: 'test' });

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    matSnackBar = TestBed.inject(MatSnackBar);
    spyOn(matSnackBar, 'open');

    const movieService = TestBed.inject(MovieService);
    searchSpy = spyOn(movieService, 'search');

    movieSearchResults = [];

    for (let i = 1; i <= 5; i++) {
      movieSearchResults.push(getNewMovieSearchResult(i));
    }

    movieSearchResponse = {
      Response: true,
      Search: movieSearchResults,
      totalResults: movieSearchResults.length,
    };

    component = fixture.componentInstance;
  });

  it('should handle search results', fakeAsync(() => {
    searchSpy.and.returnValue(of(movieSearchResponse));

    fixture.detectChanges();

    let movieRes: MovieSearchResult[] = [];
    component.movies$.subscribe((res) => (movieRes = res));

    tick();

    expect(component.moviesCount).toEqual(movieSearchResponse.totalResults);
    expect(movieRes).toEqual(movieSearchResults);
  }));

  it('should handle invalid search term provided in query parameter', fakeAsync(() => {
    activatedRoute.queryParams = of({});

    fixture.detectChanges();

    let movieRes: MovieSearchResult[] = [];
    component.movies$.subscribe((res) => (movieRes = res));

    tick();

    expect(component.moviesCount).toEqual(0);
    expect(movieRes).toEqual([]);
  }));

  it('should handle empty response', fakeAsync(() => {
    searchSpy.and.returnValue(
      of({ Response: false } as unknown as MovieSearchResponse)
    );

    fixture.detectChanges();

    let movieRes: MovieSearchResult[] = [];
    component.movies$.subscribe((res) => (movieRes = res));

    tick();

    expect(component.moviesCount).toEqual(0);
    expect(movieRes).toEqual([]);
    expect(
      fixture.debugElement.query(By.css('.headline')).nativeElement.textContent
    ).toContain('No movies found for search term');
  }));

  it('should handle error response', fakeAsync(() => {
    const error = new Error('invalid value');
    searchSpy.and.returnValue(throwError(() => error));

    fixture.detectChanges();

    let movieRes: MovieSearchResult[] = [];
    component.movies$.subscribe((res) => (movieRes = res));

    tick();

    expect(component.moviesCount).toEqual(0);
    expect(movieRes).toEqual([]);
    expect(matSnackBar.open).toHaveBeenCalledWith(error.message, undefined, {
      duration: 5000,
      verticalPosition: 'top',
    });
    expect(router.navigate).toHaveBeenCalledWith(['../'], {
      relativeTo: activatedRoute,
    });
  }));
});
