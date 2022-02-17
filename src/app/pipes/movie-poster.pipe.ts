import { Pipe, PipeTransform } from '@angular/core';
import { MovieSearchResult } from '../models/movie-detail';

@Pipe({
  name: 'moviePoster',
})
export class MoviePosterPipe implements PipeTransform {
  transform(movie: MovieSearchResult): string {
    // Check if the movie has a poster, if it doesn't then return the placeholder poster
    return movie.Poster !== 'N/A'
      ? movie.Poster
      : 'assets/images/placeholder-poster.png';
  }
}
