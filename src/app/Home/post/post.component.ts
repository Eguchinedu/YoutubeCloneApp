import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/services/service.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  user_id!: string;
  currentPost!: any;
  userCommenter: any[] = [];
  commentForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private _service: ServiceService,
    private _toastr: ToastrService,
    private _storage: StorageService,
    private _router: Router
  ) {
    this.user_id = this._storage.getUserId();
    this.commentForm = new FormGroup({
      comment: new FormControl(null, [Validators.required]),
      postId: new FormControl(Number(this.route.snapshot.params['postId']), [
        Validators.required,
      ]),
      userId: new FormControl(Number(this._storage.getUserId()), [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getPostofUser();
  }

  getPostofUser() {
    let user_id = this.route.snapshot.params['userId'];
    let post_id = this.route.snapshot.params['postId'];

    this._service.getPostofUser(user_id, post_id).subscribe(
      (result) => {
        this.currentPost = result;
        console.log(result);
      },
      (error) => {
        console.log(error);

        this._toastr.error(error.errorReason, 'Error!');
      }
    );
  }
  refreshPage() {
    const currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
    });
  }

  postComment() {
if (this.commentForm.valid) {
  let user_id = this.route.snapshot.params['userId'];
  let post_id = this.route.snapshot.params['postId'];

  this._service
    .addComment(user_id, post_id, this.commentForm.getRawValue())
    .subscribe(
      (result) => {
        this.commentForm.controls['comment'].setValue(null);
        this.refreshPage();
        console.log(this._toastr.success('Comment added successfully'));
        result;
      },
      (error) => {
        // Handle errors from the addComment API call
       console.log(error);

       this._toastr.error(error.errorReason, 'Error!');
      }
    );
} else {
  this._toastr.error('Invalid comment', 'Error!');
}
  }
}
