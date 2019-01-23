import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TmdbService {
  private _tmdbUrl: string = 'https://api.themoviedb.org/3/';
  private _tmdbUrlSingle: string = 'https://api.themoviedb.org/3/movie/';

  constructor(private _http: HttpClient) { }

  public getPopularFilms(): Observable<any> {
    return this._http.get<any>(this._tmdbUrl + 'movie/popular?' + environment.tmdbAPI + '&language=en-US&page=1');
  }

  public getSingleFilm(value): Observable<any> {
    return this._http.get<any>(this._tmdbUrlSingle + value + environment.tmdbAPI);
  }

  public searchTMDB(term): Observable<any> {
    return this._http.get<any>(this._tmdbUrl + 'search/movie?' + environment.tmdbAPI + '&language=en-US&query=' + term + '&page=1&include_adult=false')
  }

  public getImgUrl(value) {
    return this._http.get<any>("https://image.tmdb.org/t/p/w1280" + value);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
