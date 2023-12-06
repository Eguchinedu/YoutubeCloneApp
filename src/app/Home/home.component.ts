import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Posts!: any;
  LoggedUserId!: string;

  constructor(
    public _service: ServiceService,
    private router: Router,
    public _storage: StorageService,
    public _toastr: ToastrService
  ) {
    this.LoggedUserId = this._storage.getUserId();
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this._service.getAllPosts().subscribe(
      (res) => {
        this.Posts = res;
        console.log(res);
      },
      (error) => {
        console.log(error);

        this._toastr.error(error.errorReason, 'Error!');
      }
    );
  }
  viewPost(user_id: string, post_id: string) {
    this.router.navigate([user_id, post_id]);
  }

  addLikes(post_id: string) {
    if (!this._storage.isLoggedIn()) {
      this._toastr.error('Please log in first to like or comment');
      this.router.navigate(['/login']);
      return;
    } else {
      let data = {
        postId: post_id,
        userId: Number(this.LoggedUserId),
      };

      this._service.addLike(post_id, data).subscribe(
        (res) => {
          res;
          this._toastr.success('Liked!');
          location.reload();
          this.ngOnInit();
        },
        (error) => {
          console.log(error);

          this._toastr.error(error.errorReason, 'Error!');
        }
      );
    }
  }
}
