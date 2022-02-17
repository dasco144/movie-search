import { MovieSearchResult } from '../models/movie-detail';
import { getNewMovieSearchResult } from '../testing/helpers.spec';
import { MoviePosterPipe } from './movie-poster.pipe';

describe('MoviePosterPipe', () => {
  let pipe: MoviePosterPipe;
  let movie: MovieSearchResult;

  beforeEach(() => {
    pipe = new MoviePosterPipe();
    movie = getNewMovieSearchResult();
  });

  it('should return the poster if valid', () => {
    const poster = pipe.transform(movie);

    expect(poster).toEqual(movie.Poster);
  });

  it('should return the placeholder poster if invalid', () => {
    movie.Poster = 'N/A';

    const poster = pipe.transform(movie);

    expect(poster).toEqual('assets/images/placeholder-poster.png');
  });
});
