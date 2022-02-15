import { MoviePosterPipe } from './movie-poster.pipe';

describe('MoviePosterPipe', () => {
  it('create an instance', () => {
    const pipe = new MoviePosterPipe();
    expect(pipe).toBeTruthy();
  });
});
