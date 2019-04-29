import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/shared/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DataService } from 'src/shared/data.service';
import { Reviewer } from '../reviewer';
import { Review } from '../review';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  form: FormGroup;
  email: string;
  password: string;
  confirmEmail: string;
  public invalid: boolean;
  error: string;
  bio: string;
  name:string;
  reviewer: Reviewer;
  result: any;

  constructor(public authService: AuthService, public router: Router, public data: DataService) {
    this.invalid = false;
  }

  validate() {
    if (this.email == this.confirmEmail) {
      this.invalid = false;
      this.signUp();
    }
    else {
      this.invalid = true;
    }
  }

  signUp() {
    this.reviewer = new Reviewer;
    this.reviewer.bio = this.bio;
    this.reviewer.name = this.name;
    this.reviewer.reviews = [];
    this.authService.signup(this.email, this.password).then(value => {
      this.data.createUser(value.user.uid, this.formatPost());
      this.router.navigate(['/edit-profile']);
    });
  }

  formatPost(): any {
    return {
      "name": this.reviewer.name,
      "bio": this.reviewer.bio,
      "reviews": []
    }
  }

}
