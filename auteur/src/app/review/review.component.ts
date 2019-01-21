import { Component, OnInit, Input } from '@angular/core';
import { Review } from '../review';
import { Reviewer } from '../reviewer';
import { DataService } from 'src/shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent{
  // Assembling the review in order to send it off via the data service
  reviewContent: string;
  reviewRating: number;
  review: Review;
  reviewer: Reviewer;
  @Input() movieID: string;
  @Input() movieName: string;

  // If the user is logged in, get user ID. Otherwise, send to login
  constructor(private data: DataService, private route: Router) {
    if(this.data.iuid!=null) {
      this.data.getUser(this.data.iuid).subscribe(value => {
        this.reviewer = value;
      });
    }
    else {
      this.route.navigate(['login']);
    }
   }

   createReview(content, rating) {
    this.review.authorName = this.reviewer.name;
    this.review.content = this.reviewContent;
    this.review.movieID = this.movieID;
    this.review.score = this.reviewRating;
    this.review.movieName = this.movieName;
    this.reviewer.reviews.push(this.review); //adds the new review to the array, then patches the array
    this.data.createReview(this.formatPost(), this.data.iuid, this.movieID);
  }

  formatPost(): any {
    return {
      "Reviews": this.reviewer.reviews
    }
  }

}
