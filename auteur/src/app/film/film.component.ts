import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/shared/tmdb.service';
import { Review } from '../review';
import { Reviewer } from '../reviewer';
import { DataService } from 'src/shared/data.service';
import { FirebaseDatabase, FirebaseStorage } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/shared/auth.service';

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
  reviewer: any;
  reviews: any[] = [];
  reviewId: string;

  constructor(private router: Router, private route: ActivatedRoute, private tmdb: TmdbService, private data: DataService, private fbd: AngularFirestore, private auth: AuthService) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      this.filmId = queryParams.get("id")
    });
    this.reviewer = this.data.getUser(this.data.iuid);
    this.sendRequest();
    this.loaded = false;
    this.data.getReviewsForFilm(this.filmId).subscribe(res => {
      for (var key in res) {
        this.reviews.push(res[key])
      }
      console.log(this.reviews)
    });
  }

  isLoggedIn(): boolean {
    return this.auth.currentUser;
  }

  sendRequest() {
    this.tmdb.getSingleFilm(this.filmId).subscribe(search => {
      this.searchResults = search;
      this.film = this.searchResults;
      this.film["url"] = "https://image.tmdb.org/t/p/w1280" + this.film["poster_path"]
      this.loaded = true;
    })
  }

  createReview() {
    if (!this.auth.currentUser) {
      this.router.navigate(['/login']);
    }
    else {
      this.reviewId = this.fbd.createId();
      this.review = new Review;
      this.reviewer.reviews = [];
      this.review.date = Date.now();
      this.reviewer.reviews.push(this.review); //adds the new review to the array, then patches the array
      this.data.createReview(this.formatPost(), this.data.iuid, this.filmId, this.reviewId).subscribe(res => {
        this.data.getReviewsForFilm(this.filmId).subscribe(res => {
          this.reviews = [];
          for (var key in res) {
            this.reviews.push(res[key])
          }
        });
      });
      this.reviewContent = "";
      this.reviewRating = null;
    }
  }

  viewReview(review) {
    console.log(review)
    this.router.navigate(['/review'], { queryParams: { reviewId: review["reviewId"], filmId : this.filmId } });
  }

  formatPost(): any {
    return {
      "reviewId": this.reviewId,
      "reviewer": this.data.iuid,
      "reviewerName": this.reviewer.reviewerName,
      "content": this.reviewContent,
      "score": this.reviewRating,
      "date": this.review.date,
      "movieId": this.filmId,
      "movieName": this.film.original_title
    }
  }

}
