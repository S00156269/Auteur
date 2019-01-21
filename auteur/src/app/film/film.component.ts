import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/shared/tmdb.service';
import { sendRequest } from 'selenium-webdriver/http';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  filmId: any;
  film: any;
  searchResults: any[];
  constructor(private router: Router,  private route: ActivatedRoute, private tmdb: TmdbService) { }

  sendRequest() {
    this.tmdb.getSingleFilm(this.filmId).subscribe(search => {
      this.searchResults = search.results;
      this.searchResults.forEach(result => {
        result["url"] = "https://image.tmdb.org/t/p/w1280" + result["poster_path"]
      });
      this.film = this.searchResults[0];
    })
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      this.filmId = queryParams.get("id")
    });
    this.sendRequest();
  }

}
