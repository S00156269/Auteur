import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/shared/tmdb.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchResults: any[];
  searchTerm: string;

  constructor(private route: ActivatedRoute, private tmdb: TmdbService) { }

  sendRequest(title) {
    this.tmdb.searchTMDB(title).subscribe( search => {
      this.searchResults = search.results;
    })
  }

  ngOnInit() {
    this.searchTerm = this.route.snapshot.queryParamMap.get("term")
    this.route.queryParamMap.subscribe(queryParams => {
      this.searchTerm = queryParams.get("term")
    })
  }
}
