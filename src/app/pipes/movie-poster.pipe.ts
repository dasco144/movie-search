import { Pipe, PipeTransform } from '@angular/core';
import { MovieDetail } from '../models/movie-detail';
import { MovieSearchResult } from '../models/movie-search-result';

@Pipe({
  name: 'moviePoster',
})
export class MoviePosterPipe implements PipeTransform {
  transform(movie: MovieDetail | MovieSearchResult): unknown {
    return movie.Poster !== 'N/A'
      ? movie.Poster
      : 'assets/images/placeholder-poster.png';
  }
}
