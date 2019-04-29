import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../comment';
import { DataService } from 'src/shared/data.service';
import { AuthService } from 'src/shared/auth.service';
import { ReputationService } from 'src/shared/reputation.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  voted: boolean;
  loaded: boolean;
  comment:any;
  @Input() commentData: any;
  currentUser = this.authService.currentUser;
  userVoted: boolean;

  constructor(private dataService: DataService, private authService: AuthService, private rep: ReputationService) { }

  ngOnInit() {
    this.comment = this.dataService.getComment(this.commentData.reviewId, this.commentData.filmId, this.commentData.commentId).subscribe(res => {
      if (res != null) {
        this.checkIfUserVoted();
      }
    });
  }

  // TODO: Check if user has voted
  checkIfUserVoted() {
    if (this.currentUser) {
      if (this.rep.checkIfUserVoted(this.commentData.reviewId, this.commentData.commentId))
      {

      }
      }
    else {
      this.userVoted == true;
    }
  }
}
