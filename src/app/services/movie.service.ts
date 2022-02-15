import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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

  constructor(private httpClient: HttpClient) {}

  search(title: string): Observable<{
    Response: boolean;
    Search: MovieSearchResult[];
    totalResults: number;
  }> {
    const params: HttpParams = new HttpParams().set('s', title);

    return this.httpClient.get<MovieSearchResponse>(this.apiUrl, { params });
  }

  getByImdbID(id: string): Observable<MovieDetail> {
    const params: HttpParams = new HttpParams().set('i', id);

    return this.httpClient.get<MovieDetail>(this.apiUrl, { params });
  }
}
