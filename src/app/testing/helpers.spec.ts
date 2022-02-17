import { MovieType } from '../enums/movie-type';
import {
  MovieDetail,
  MovieRating,
  MovieSearchResult,
} from '../models/movie-detail';

export function getNewMovieSearchResult(id?: number): MovieSearchResult {
  const movieSearchResult: MovieSearchResult = {
    Title: 'Test Movie',
    Poster: 'Test Poster',
    Type: MovieType.Movie,
    Year: '2019',
    imdbID: `tt${id}` ?? 'tt1234567',
  };

  return movieSearchResult;
}

export function getNewMovieDetail(id?: number): MovieDetail {
  const movieDetail: MovieDetail = {
    ...getNewMovieSearchResult(id ?? 1234567),
    Rated: 'PG',
    Released: '1 January 2022',
    Runtime: '120 min',
    Genre: 'Action',
    Director: 'Director 1',
    Writer: 'Writer 1',
    Actors: 'Actor 1',
    Plot: 'Movie plot',
    Language: 'English',
    Country: 'United States',
    Awards: 'No awards',
    Ratings: [getNewMovieRating(1), getNewMovieRating(2), getNewMovieRating(3)],
    Metascore: '5.5',
    imdbRating: '6.0',
    imdbVotes: '1000',
    DVD: '1 February 2022',
    BoxOffice: '$50,000,000',
    Production: 'N/A',
    Website: 'N/A',
    Response: 'True',
  };

  return movieDetail;
}

export function getNewMovieRating(id?: number): MovieRating {
  const movieRating: MovieRating = {
    Source: `Movie Rating ${id}`,
    Value: Math.floor(Math.random() * 11).toString(),
  };

  return movieRating;
}
