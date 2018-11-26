import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: Observable<firebase.User>;
  error: string;
  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password).then(function() {
        // Success
      }).catch(err => {
        // Error
        this.error = err.message;
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(function() {
      // Success.
    }).catch(err => {
      //Error
    this.error = err.message
  });
  }

  logout() {
    this.firebaseAuth.auth.signOut().then(function() {
      // Sign-out successful.
    }).catch(err => {
      this.error = err.message
    });
  }
}
