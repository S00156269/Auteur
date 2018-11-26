import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // Error handling is done by returning promises and catching errors where they're called,
  // to easily show error messages to the user.
  
  user: Observable<firebase.User>;
  error: string;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.firebaseAuth.auth.signOut();
  }
}
