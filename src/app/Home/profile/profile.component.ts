import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/services/service.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  User!: any;
  id!: string;
  videoForm!: FormGroup;

  constructor(
    private _service: ServiceService,
    private _storage: StorageService,
    private router: Router,
    private _toastr: ToastrService

  ) {
    this.id = this._storage.getUserId();
    this.videoForm = new FormGroup({
      videoUrl: new FormControl(null, [Validators.required]),
      postTitle: new FormControl(null, [Validators.required]),
      userId: new FormControl(this.id,[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this._service.getUserInfo(this.id).subscribe((profile) => {
      console.log(profile);
      this.User = profile;
    });
  }
  viewPost(user_id: string, post_id: string) {
    this.router.navigate([user_id, post_id]);
  }
  addLikes(post_id: string) {
    if (this.id == '') {
      this._toastr.error('Please log in first');
    }
    let data = {
      postId: post_id,
      userId: Number(this.id),
    };
    this._service.addLike(post_id, data).subscribe((res) => {
      res;
    });
  }

  uploadVideo(){
console.log(this.videoForm.getRawValue());

  }
}
