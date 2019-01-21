import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbService } from 'src/shared/tmdb.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResults: any[];
  imageUrl: any;
  @Input() searchTerm: string;
  ready: Boolean;

  constructor(private router: Router, private route: ActivatedRoute, private tmdb: TmdbService) { }

  ngOnInit() {
    this.searchTerm = this.route.snapshot.queryParamMap.get("term")
    this.route.queryParamMap.subscribe(queryParams => {
      this.searchTerm = queryParams.get("term")
    })
    this.sendRequest(this.searchTerm);
  }

  sendRequest(title) {
    this.tmdb.searchTMDB(title).subscribe(search => {
      this.searchResults = search.results;
      this.searchResults.forEach(result => {
        result["url"] = "https://image.tmdb.org/t/p/w1280" + result["poster_path"];
      });
    })
  }

  viewFilm(id) {
    this.router.navigate(['/film'], { queryParams: { id: id } });
  }
}
