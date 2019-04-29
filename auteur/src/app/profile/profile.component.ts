import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/shared/data.service';
import { AuthService } from 'src/shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentReviewer: Observable<any>;
  loaded: boolean;
  reviews: any[];
  hasReviews: boolean;
  iuid: string;

  constructor(private dataService: DataService, private auth: AuthService, private http: HttpClient, private afa: AngularFireAuth) { }

  ngOnInit() {
    this.loaded = false;
    this.hasReviews = false;
    this.getReviewer();
  }

  private getReviewer(): any {
    this.afa.authState.subscribe((resp) => {
      if (resp != null) {
        if (resp.uid) {
          this.iuid = resp.uid;
          console.log(this.iuid);
          this.dataService.getUser(this.iuid).subscribe(value => {
            this.currentReviewer = value;
            console.log(this.currentReviewer);
            if(this.currentReviewer["reviews"]!=null){
              this.hasReviews = true;
            }
            else{
              this.reviews = this.currentReviewer["reviews"];
            };
            this.loaded = true;
          });
        }
      }
    });
  }
}
