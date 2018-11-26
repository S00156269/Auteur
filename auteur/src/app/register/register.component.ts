import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/shared/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

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

  constructor(public authService: AuthService, public router: Router) {
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
    this.authService.signup(this.email, this.password).catch(err => { this.error = err });
    //this.router.navigate(['editprofile']);
  }
}
