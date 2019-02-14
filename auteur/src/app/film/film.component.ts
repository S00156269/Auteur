import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/shared/tmdb.service';
import { Review } from '../review';
import { Reviewer } from '../reviewer';
import { DataService } from 'src/shared/data.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  filmId: any;
  film: any;
  searchResults: any;
  loaded: boolean;
  reviewContent: string;
  reviewRating: number;
  review: Review;
  reviewer: Reviewer;

  constructor(private router: Router, private route: ActivatedRoute, private tmdb: TmdbService, private data: DataService) {

  }

  sendRequest() {
    this.tmdb.getSingleFilm(this.filmId).subscribe(search => {
      this.searchResults = search;
      console.log(this.searchResults)
      this.film = this.searchResults;
      this.film["url"] = "https://image.tmdb.org/t/p/w1280" + this.film["poster_path"]
      this.loaded = true;
    })
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      this.filmId = queryParams.get("id")
    });
    this.sendRequest();
    this.loaded = false;

  }

  // If the user is logged in, get user ID. Otherwise, send to login

  createReview() {
    this.review = new Review;
    this.reviewer = new Reviewer;
    this.reviewer.reviews = [];

    this.review.authorName = 'jane doe';
    this.review.content = this.reviewContent;
    this.review.movieID = this.filmId;
    this.review.score = this.reviewRating;
    this.review.movieName = this.film.original_title;
    this.reviewer.reviews.push(this.review); //adds the new review to the array, then patches the array
    this.data.createReview(this.formatPost(), this.data.iuid, this.filmId);
  }

  formatPost(): any {
    return {
      "Reviews": this.reviewer.reviews
    }
  }

}
