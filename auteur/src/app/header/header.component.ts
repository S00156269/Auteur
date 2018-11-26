import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { TmdbService } from 'src/shared/tmdb.service';
import { AuthService } from 'src/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = 'Auteur';
  mobileQuery: MediaQueryList;
  popularFilms: any[];
  error: string;

  getImgUrl(value)
  {    
    return "https://image.tmdb.org/t/p/w1280" + value;
  }

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private tmdbService: TmdbService, public authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.tmdbService.getPopularFilms().subscribe(films => {
      this.popularFilms = films.results;
    },)
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logOut() {
    this.authService.logout().catch(err => { this.error = err });
  }
}
