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
  loaded:boolean;
  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.loaded = false;
    this.getReviewer();
    this.name = this.reviewer.name;
    this.bio = this.reviewer.bio;
  }
  
  private getReviewer(): any {
    console.log(this.data.iuid);
    this.data.getUser(this.data.iuid).subscribe(value => {
      this.reviewer = value.result;
      this.loaded = true;
    });
  }

  returnToProfile(){
    this.router.navigate(['profile']);
  }

  createUserProfile() {
    this.reviewer.name = this.name;
    this.reviewer.bio = this.bio;
    this.data.createUser(this.data.iuid, this.formatPost(this.reviewer)); //sends it off to the service
    this.router.navigate(['/profile']);
  }

  formatPost(user: Reviewer): any {
    return {
      "name": user.name,
      "bio": user.bio,
      "reviews": user.reviews
    }
  }
}
