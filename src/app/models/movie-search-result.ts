import { MovieType } from '../enums/movie-type';

export interface MovieSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: MovieType;
  Poster: string;
}
