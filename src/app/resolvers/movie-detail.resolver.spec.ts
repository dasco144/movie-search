import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { MockService } from 'ng-mocks';
import { of } from 'rxjs';

import { MovieDetail } from '../models/movie-detail';
import { MovieService } from '../services/movie.service';
import { getNewMovieDetail } from '../testing/helpers.spec';
import { MovieDetailResolver } from './movie-detail.resolver';

describe('MovieDetailResolver', () => {
  let resolver: MovieDetailResolver;

  let movieService: MovieService;
  let movie: MovieDetail;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MovieService, useValue: MockService(MovieService) },
      ],
    });
    resolver = TestBed.inject(MovieDetailResolver);
  });

  beforeEach(() => {
    movie = getNewMovieDetail(1);

    movieService = TestBed.inject(MovieService);
    spyOn(movieService, 'getByImdbID').and.returnValue(of(movie));
  });

  it('should resolve with movie detail from service', fakeAsync(() => {
    const snapshot = new ActivatedRouteSnapshot();
    snapshot.params = { id: movie.imdbID };

    const resolve$ = resolver.resolve(snapshot);

    let movieDetail: MovieDetail | undefined = getNewMovieDetail(999);
    resolve$.subscribe((res) => (movieDetail = res));
    tick();

    expect(movieService.getByImdbID).toHaveBeenCalledWith(movie.imdbID);
    expect(movieDetail).toEqual(movie);
  }));

  it('should handle no id set on snapshot params', fakeAsync(() => {
    const snapshot = new ActivatedRouteSnapshot();

    const resolve$ = resolver.resolve(snapshot);

    let movieDetail: MovieDetail | undefined = getNewMovieDetail(999);
    resolve$.subscribe((res) => (movieDetail = res));
    tick();

    expect(movieService.getByImdbID).not.toHaveBeenCalled();
    expect(movieDetail).toBeUndefined();
  }));
});
