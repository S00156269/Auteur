import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TmdbService } from 'src/shared/tmdb.service';
import { AuthService } from 'src/shared/auth.service';
import { Router } from '@angular/router';

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
  searchTerm: string;

  navbarOpen = false;

  private _mobileQueryListener: () => void;

  constructor(private tmdbService: TmdbService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.tmdbService.getPopularFilms().subscribe(films => {
      this.popularFilms = films.results;
    },)
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  search() {
    this.router.navigate(['/search'], { queryParams: { term: this.searchTerm } });
  }

  logOut() {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.currentUser;
  }
}
