import { Component, OnInit, Input } from '@angular/core';
import { Review } from '../review';
import { Reviewer } from '../reviewer';
import { DataService } from 'src/shared/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/shared/tmdb.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/shared/auth.service';

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

  constructor(private router: Router, private route: ActivatedRoute, private tmdb: TmdbService, private data: DataService, private fbd: AngularFirestore, private auth: AuthService) {
  
  }

  ngOnInit() {
    this.reviewLoaded = false;
    this.filmLoaded = false;

    this.route.queryParamMap.subscribe(queryParams => {
      this.reviewId = queryParams.get("reviewId"),
      this.filmId = queryParams.get("filmId")
    });
    this.getData();
    
  }

  getData() {
    this.data.getReview(this.filmId, this.reviewId).subscribe(review => {
      this.review = review;
      this.reviewLoaded = true;
    })

    this.tmdb.getSingleFilm(this.filmId).subscribe(film => {
      this.film = film;
      this.film["url"] = "https://image.tmdb.org/t/p/w1280" + this.film["poster_path"];
      this.filmLoaded = true;
    });
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
