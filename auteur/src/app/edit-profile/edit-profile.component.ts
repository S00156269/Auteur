import { Component, OnInit } from '@angular/core';
import { Reviewer } from '../reviewer';
import { DataService } from 'src/shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  name: string;
  bio: string;
  reviewer: Reviewer;
  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
  }

  createUserProfile() {
    this.reviewer = new Reviewer;
    this.reviewer.name = this.name;
    this.reviewer.bio = this.bio;
    this.reviewer.faveMovies = [];
    this.reviewer.faveGenres = [];
    this.data.createUser(this.formatPost(this.reviewer)); //sends it off to the service
    this.router.navigate(['profile']);
  }

  formatPost(user: Reviewer): any {
    return {
      "Name": user.name,
      "Bio": user.bio,
      "FaveGenres": user.faveGenres,
      "FaveMovies": user.faveMovies,
      "Reviews": user.reviews
    }
  }
}
