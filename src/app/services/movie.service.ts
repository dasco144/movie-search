import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { MovieDetail, MovieSearchResponse } from '../models/movie-detail';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly apiUrl = environment.apiUrl;

  private userFavourites: string[] = [];

  // Setup a BehaviorSubject that we can use to notify observers of changes to the favorites array
  private userFavouritesSubj = new BehaviorSubject<string[]>(
    this.userFavourites
  );

  // Expose the userFavouritesSubj as an observable, so that external users of the service cannot trigger emissions via .next on the subject.
  // Effectively, this means that the subject is exposed as a read only observable.
  userFavourites$ = this.userFavouritesSubj.asObservable();

  constructor(private httpClient: HttpClient) {}

  search(
    searchQuery: string,
    pageNo?: number
  ): Observable<MovieSearchResponse> {
    // Set the query params to include the search query and type as per the api documentation
    let params = new HttpParams().set('s', searchQuery).set('type', 'movie');

    if (pageNo) {
      params = params.append('page', pageNo);
    }

    return this.httpClient.get<MovieSearchResponse>(this.apiUrl, { params });
  }

  getByImdbID(id: string): Observable<MovieDetail> {
    // Set the query params to include the imdbID as per the api documentation
    const params: HttpParams = new HttpParams().set('i', id);

    return this.httpClient.get<MovieDetail>(this.apiUrl, { params });
  }

  toggleFavourite(id: string): void {
    // Check if the current favourites includes the provided id
    if (this.userFavourites.includes(id)) {
      // If it does then remove it
      this.removeFromFavourites(id);
      return;
    }

    // If it doesn't then add it
    this.addToFavourites(id);
  }

  private addToFavourites(id: string): void {
    // Adds the id to the favourites if it is not already in the array
    this.userFavourites.push(id);
    // And then emit from the subject to notify the observers of a change to the favorites
    this.userFavouritesSubj.next(this.userFavourites);
  }

  private removeFromFavourites(id: string): void {
    // Removes the id from the favourites if it is already in the array
    this.userFavourites = this.userFavourites.filter((favId) => id !== favId);
    // And then emit from the subject to notify the observers of a change to the favorites
    this.userFavouritesSubj.next(this.userFavourites);
  }
}
