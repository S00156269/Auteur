import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;
  error: string;

  constructor(public authService: AuthService, public router: Router) {}

  logIn() {
    this.authService.login(this.email, this.password).catch(err => { this.error = err });
  }
}
