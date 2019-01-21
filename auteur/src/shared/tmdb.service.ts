import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_KEY } from '../assets/api'

@Injectable({
  providedIn: 'root'
})

export class TmdbService {
  private _tmdbUrl: string = 'https://api.themoviedb.org/3/';

  constructor(private _http: HttpClient) { }

  public getPopularFilms(): Observable<any> {
    return this._http.get<any>(this._tmdbUrl + 'movie/popular?' + API_KEY + '&language=en-US&page=1');
  }

  searchTMDB(term) : Observable<any>{
    return this._http.get<any>(this._tmdbUrl + 'search/movie?' + API_KEY + '&language=en-US&query=' + term + '&page=1&include_adult=false')
    }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
