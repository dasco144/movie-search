import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  MovieDetail,
  MovieSearchResponse,
  MovieSearchResult,
} from '../models/movie-detail';

import { MovieService } from './movie.service';
import { environment } from '../../environments/environment';
import {
  getNewMovieDetail,
  getNewMovieSearchResult,
} from '../testing/helpers.spec';

describe('MovieService', () => {
  let service: MovieService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(MovieService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('search', () => {
    let movieSearchResults: MovieSearchResult[];
    let movieSearchResponse: MovieSearchResponse;

    beforeEach(() => {
      movieSearchResults = [];

      for (let i = 1; i <= 5; i++) {
        movieSearchResults.push(getNewMovieSearchResult());
      }

      movieSearchResponse = {
        Response: true,
        Search: movieSearchResults,
        totalResults: movieSearchResults.length,
      };
    });

    it('should use provided parameters to retrieve search results from the api', fakeAsync(() => {
      const searchQuery = 'Test Movie';

      let results: MovieSearchResponse = {
        Response: false,
        Search: [],
        totalResults: 0,
      };
      service.search(searchQuery).subscribe((res) => (results = res));

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}?s=${encodeURI(searchQuery)}&type=movie`
      );

      expect(req.request.method).toBe('GET');

      req.flush(movieSearchResponse);

      tick();

      expect(results).toEqual(movieSearchResponse);

      httpTestingController.verify();
    }));

    it('should use provided parameters to retrieve search results from the api (with paging)', fakeAsync(() => {
      const searchQuery = 'Test Movie';
      const pageNo = 5;

      let results: MovieSearchResponse = {
        Response: false,
        Search: [],
        totalResults: 0,
      };
      service.search(searchQuery, pageNo).subscribe((res) => (results = res));

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}?s=${encodeURI(
          searchQuery
        )}&type=movie&page=${pageNo}`
      );

      expect(req.request.method).toBe('GET');

      req.flush(movieSearchResponse);

      tick();

      expect(results).toEqual(movieSearchResponse);

      httpTestingController.verify();
    }));
  });

  describe('getByImdbId', () => {
    it('should use provided id to retrieve movie detail from the api', fakeAsync(() => {
      const movieDetail = getNewMovieDetail(1);

      const id = 'tt1234567';

      let movieResult: MovieDetail = getNewMovieDetail(999);
      service.getByImdbID(id).subscribe((res) => (movieResult = res));

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}?i=${id}`
      );

      expect(req.request.method).toBe('GET');

      req.flush(movieDetail);

      tick();

      expect(movieDetail).toEqual(movieResult);

      httpTestingController.verify();
    }));
  });

  describe('favourites', () => {
    it('should toggle favourites', fakeAsync(() => {
      const movieDetail = getNewMovieDetail(1);

      let favouriteIds: string[] = [];
      service.userFavourites$.subscribe((res) => (favouriteIds = res));

      service.toggleFavourite(movieDetail.imdbID);
      tick();

      expect(favouriteIds).toEqual([movieDetail.imdbID]);

      const movieDetail2 = getNewMovieDetail(2);

      service.toggleFavourite(movieDetail2.imdbID);
      tick();

      expect(favouriteIds).toEqual([movieDetail.imdbID, movieDetail2.imdbID]);

      service.toggleFavourite(movieDetail.imdbID);
      tick();

      expect(favouriteIds).toEqual([movieDetail2.imdbID]);
    }));
  });
});
