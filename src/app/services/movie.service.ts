import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieSearchResult } from '../models/movie-search-result';
import { MovieDetail } from '../models/movie-detail';

type MovieSearchResponse = {
  Response: boolean;
  Search: MovieSearchResult[];
  totalResults: number;
};

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly apiUrl = environment.apiUrl;

  private userFavourites: string[] = [];

  private userFavouritesSubj = new BehaviorSubject<string[]>(
    this.userFavourites
  );

  userFavourites$ = this.userFavouritesSubj.asObservable();

  constructor(private httpClient: HttpClient) {}

  search(title: string): Observable<{
    Response: boolean;
    Search: MovieSearchResult[];
    totalResults: number;
  }> {
    const params: HttpParams = new HttpParams()
      .set('s', title)
      .set('type', 'movie');

    return this.httpClient.get<MovieSearchResponse>(this.apiUrl, { params });
  }

  getByImdbID(id: string): Observable<MovieDetail> {
    const params: HttpParams = new HttpParams().set('i', id);

    return this.httpClient.get<MovieDetail>(this.apiUrl, { params });
  }

  toggleFavourite(id: string): void {
    if (this.userFavourites.includes(id)) {
      this.removeFromFavourites(id);
      return;
    }

    this.addToFavourites(id);
  }

  addToFavourites(id: string): void {
    if (this.userFavourites.includes(id)) {
      return;
    }

    this.userFavourites.push(id);
    this.userFavouritesSubj.next(this.userFavourites);
  }

  removeFromFavourites(id: string): void {
    if (!this.userFavourites.includes(id)) {
      return;
    }

    this.userFavourites = this.userFavourites.filter((favId) => id !== favId);
    this.userFavouritesSubj.next(this.userFavourites);
  }
}
