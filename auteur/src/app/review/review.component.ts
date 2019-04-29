import { Component, OnInit, Input } from '@angular/core';
import { Review } from '../review';
import { Reviewer } from '../reviewer';
import { DataService } from 'src/shared/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/shared/tmdb.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/shared/auth.service';
import { CommentComponent } from '../comment/comment.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{
  // Assembling the review in order to send it off via the data service
  reviewContent: string;
  reviewRating: number;
  review: Review;
  reviewer: Reviewer;
  reviewId: string;
  filmId: string;
  film: any;
  reviewLoaded: boolean;
  filmLoaded: boolean;
  recommended: boolean;
  recommendedStatus: string;
  noComments: boolean;
  comments: Observable<any>[];
  user: Observable<any>;

  constructor(private router: Router, private route: ActivatedRoute, private tmdb: TmdbService, private data: DataService, private fbd: AngularFirestore, private auth: AuthService) {}

  isLoggedIn(): boolean {
    return this.auth.currentUser;
  }

  ngOnInit() {
    this.reviewLoaded = false;
    this.filmLoaded = false;

    this.route.queryParamMap.subscribe(queryParams => {
      this.reviewId = queryParams.get("reviewId"),
      this.filmId = queryParams.get("filmId")
    });
    this.getData();
    this.user = this.data.getUser(this.data.iuid);
    this.reviewer.bio = this.user["bio"];
    this.reviewer.name = this.user["name"];
  }

  getData() {
    this.data.getReview(this.filmId, this.reviewId).subscribe(review => {
      this.review = review;
      if(this.review.recommended == false){
        this.recommended = false;
        this.recommendedStatus = "Not recommended";
      }
      else{
        this.recommended = true;
        this.recommendedStatus = "Recommended";
      }
      this.reviewLoaded = true;
    })

    this.tmdb.getSingleFilm(this.filmId).subscribe(film => {
      this.film = film;
      this.film["url"] = "https://image.tmdb.org/t/p/w1280" + this.film["poster_path"];
      this.filmLoaded = true;
    });
  }

  getComments(){
    this.data.getAllComments(this.filmId, this.reviewId).subscribe(response => {
      if(response != null){
        this.comments = response;
      }
      else
        this.noComments = true;
    });
    
  }

  submitComment(){
    this.data.postComment(this.reviewId, this.filmId, this.data, this.formatComment())
  }

  formatComment(): any {
    return {
      "reviewId": this.reviewId,
      "reviewer": this.data.iuid,
      "reviewerName": this.reviewer.name,
      "content": this.reviewContent,
      "recommended": this.recommended,
      "date": this.review.date,
      "movieId": this.filmId,
      "movieName": this.film.original_title
    }
  }

  loaded(){
    if(this.filmLoaded && this.reviewLoaded){
      return true;
    }
    else{
      return false;
    }
  }
}
