import { Component, OnInit } from '@angular/core';
import { TmdbService } from 'src/shared/tmdb.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularFilms: Observable<any>;
  
  constructor(private router: Router, private route: ActivatedRoute, private tmdb: TmdbService) { }

  ngOnInit() {
    this.tmdb.getPopularFilms().subscribe(search => {
      console.log(search);
      this.popularFilms = search.results;
      this.popularFilms.forEach(result => {
        result["url"] = "https://image.tmdb.org/t/p/w1280" + result["poster_path"];
      });
      console.log(this.popularFilms)
    })
  }

  viewFilm(id) {
    this.router.navigate(['/film'], { queryParams: { id: id } });
  }
}
