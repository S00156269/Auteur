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
  uid: string;
  public invalid: boolean;

  constructor(public authService: AuthService, public afa: AngularFireAuth, public router: Router) {
    this.invalid = false;
  }

  validate() {
    if (this.email == this.confirmEmail) {
      this.invalid = false;
      this.signup();
    }
    else {
      this.invalid = true;
    }
  }

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
    //this.router.navigate(['editprofile']);
  }


}
