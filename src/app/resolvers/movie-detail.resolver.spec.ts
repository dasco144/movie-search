import { TestBed } from '@angular/core/testing';

import { MovieDetailResolver } from './movie-detail.resolver';

describe('MovieDetailResolver', () => {
  let resolver: MovieDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MovieDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
