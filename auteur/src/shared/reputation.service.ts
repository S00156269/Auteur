import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReputationService {

  constructor(private http: HttpClient) { }

  postReviewVote(reviewId, uid) {
    this.http.patch('https://auteur-1541508408043.firebaseio.com/reputation/' + reviewId + "/" + ".json", uid);
  }

  postCommentVote(commentId, uid) {
    this.http.patch('https://auteur-1541508408043.firebaseio.com/reputation/' + commentId + "/" + ".json", uid);
  }

  getReviewVotes(reviewId): Observable<any> {
    return this.http.get('https://auteur-1541508408043.firebaseio.com/reputation/' + reviewId  + ".json");
  }

  getCommentVotes(commentId): Observable<any> {
    return this.http.get('https://auteur-1541508408043.firebaseio.com/reputation/' + commentId + ".json");
  }

  checkIfUserVoted(reviewId, uid){
    return this.http.get('https://auteur-1541508408043.firebaseio.com/reputation/' + reviewId + "/" + ".json", uid);
  }
}
