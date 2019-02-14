import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/shared/data.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  currentReviewer: any;
  loaded: boolean;
  reviews: any[];

  constructor(private dataService: DataService) {
    this.loaded=false;
    this.getReviewer();
  }

  private getReviewer(): any {
    console.log(this.dataService.iuid);
    this.dataService.getUser(this.dataService.iuid).subscribe(value => {
      if(value){
      console.log(this.dataService.iuid),
      this.currentReviewer = value,
      console.log(this.currentReviewer),
      this.reviews = this.currentReviewer.Reviews;
      this.loaded = true;}
      else{
        setTimeout(this.getReviewer(),500);
      }
    });
  }
}
