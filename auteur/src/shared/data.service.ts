import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Get the logged-in user
  iuid: string;
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
  createUser(data) {
    this.http.patch('https://auteur-1541508408043.firebaseio.com/users/' + this.iuid + ".json", data).subscribe(res => { console.log(res) });
  }
  // Retrieve a user's details from the db, passing in their ID
  getUser(iuid): Observable<any> {
    return this.http.get('https://auteur-1541508408043.firebaseio.com/users/' + iuid + '.json');
  }
  // Create a review (refreshes if it writes sucessfuly to film)
  createReview(data, uid, filmID, reviewId) {
    this.http.patch('https://auteur-1541508408043.firebaseio.com/users/' + uid + "/Reviews/" + reviewId + ".json", data);
    return this.http.patch('https://auteur-1541508408043.firebaseio.com/films/' + filmID + "/Reviews/" + reviewId + ".json", data);
  }
  // Get all reviews for specific film
  getReviewsForFilm(filmID): Observable<any> {
    return this.http.get('https://auteur-1541508408043.firebaseio.com/films/' + filmID + "/Reviews" + ".json");
  }
  // Get users' reviews
  getReviewsForProfile(userID): Observable<any> {
    return this.http.get('https://auteur-1541508408043.firebaseio.com/users/' + userID + "/Reviews" + ".json");
  }
  getReview(filmId, reviewId): Observable<any> {
    console.log('https://auteur-1541508408043.firebaseio.com/films/' + filmId + "/Reviews/" + reviewId + ".json");
    return this.http.get('https://auteur-1541508408043.firebaseio.com/films/' + filmId + "/Reviews/" + reviewId + ".json");
  }
}