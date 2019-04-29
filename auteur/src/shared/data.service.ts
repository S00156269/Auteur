import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/comment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // User
  // Get the logged-in user
  iuid: string;
  comment: Comment;
  constructor(private http: HttpClient, private afa: AngularFireAuth) {
    this.afa.authState.subscribe((resp) => {
      if (resp != null) {
        if (resp.uid) {
          this.iuid = resp.uid;
        }
      }
    });
  }
  // Create a user in the db for logged-in user
  createUser(uid, data) {
    console.log(data)
    this.http.patch('https://auteur-1541508408043.firebaseio.com/users/' + uid + ".json", data);
  }
  // Retrieve a user's details from the db, passing in their ID
  getUser(iuid): Observable<any> {
    return this.http.get('https://auteur-1541508408043.firebaseio.com/users/' + iuid + '.json');
  }

  // Review
  // Create a review (refreshes if it writes sucessfuly to film)
  createReview(data, uid, filmID, reviewId) {
    this.http.patch('https://auteur-1541508408043.firebaseio.com/users/' + uid + "/reviews/" + reviewId + ".json", data);
    return this.http.patch('https://auteur-1541508408043.firebaseio.com/films/' + filmID + "/reviews/" + reviewId + ".json", data);
  }
  // Get all reviews for specific film
  getReviewsForFilm(filmID): Observable<any> {
    return this.http.get('https://auteur-1541508408043.firebaseio.com/films/' + filmID + "/reviews" + ".json");
  }
  // Get users' reviews
  getReviewsForProfile(userID): Observable<any> {
    return this.http.get('https://auteur-1541508408043.firebaseio.com/users/' + userID + "/reviews" + ".json");
  }
  // Get single review
  getReview(filmId, reviewId): Observable<any> {
    return this.http.get('https://auteur-1541508408043.firebaseio.com/films/' + filmId + "/reviews/" + reviewId + ".json");
  }

  // Comments
  // Get comment
  getComment(reviewId, filmId, commentId): Observable<any> {
    return this.http.get('https://auteur-1541508408043.firebaseio.com/films/' + filmId + "/reviews/" + reviewId + "/comments/" + commentId + ".json");
  }
  // Get all comments for a review
  getAllComments(filmId, reviewId): Observable<any> {
    return this.http.get('https://auteur-1541508408043.firebaseio.com/films/' + filmId + "/reviews/" + reviewId + "/comments" + ".json");
  }
  // Post comment
  postComment(reviewId, filmId, commentId, data) {
    this.http.patch('https://auteur-1541508408043.firebaseio.com/films/' + filmId + "/reviews/" + reviewId + "/comments/" + commentId + ".json", data);
  }
}