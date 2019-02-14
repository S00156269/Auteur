import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // Error handling is done by returning promises and catching errors where they're called,
  // to easily show error messages to the user.
  authState: any = null;
  user: Observable<firebase.User>;
  error: string;

  constructor(public firebaseAuth: AngularFireAuth, private router: Router) {
    this.firebaseAuth.authState.subscribe((auth) => {
      this.authState = auth;
      let key = 'LoggedIn';
      if (auth) {
        sessionStorage.setItem(key, 'Logged');//encrypt this or move to cookies
      }
    });
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
   }

  signup(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    sessionStorage.removeItem('LoggedIn');
    this.router.navigate(['/login']);
    this.firebaseAuth.auth.signOut();
  }

  canActivate(): boolean{
    let myItem = sessionStorage.getItem('LoggedIn');
    if (myItem == "Logged") {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}