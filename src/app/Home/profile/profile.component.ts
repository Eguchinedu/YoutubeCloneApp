import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/services/service.service';
import { StorageService } from 'src/app/services/storage.service';
import { Cloudinary } from '@cloudinary/url-gen';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  User!: any;
  id!: string;
  userName!: string;
  videoForm!: FormGroup;
  selectedFile!: File | null;
  isLoading: boolean = false;
  files: any[] = [];
  Urls: string[] = [];

  constructor(
    private _service: ServiceService,
    private _storage: StorageService,
    private router: Router,
    private _toastr: ToastrService
  ) {
    this.id = this._storage.getUserId();
    this.userName = this._storage.getUserName();
    this.videoForm = new FormGroup({
      videoUrl: new FormControl(this.selectedFile, [Validators.required]),
      postTitle: new FormControl(null, [Validators.required]),
      userId: new FormControl(this.id, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getProfile();
    const cld = new Cloudinary({ cloud: { cloudName: 'dtgaovjxc' } });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    console.log(this.selectedFile);
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
    if (!this._storage.isLoggedIn()) {
      this._toastr.error('Please log in first to like or comment');
      this.router.navigate(['/login']);
      return;
    } else {
      let data = {
        postId: post_id,
        userId: Number(this.id),
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
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  uploadVideo() {
    if (this.files.length === 0) {
      this._toastr.error('Please add Video file');
      return;
    }

    console.log(this.videoForm.getRawValue());
    this.isLoading = true;
    for (let i = 0; i < this.files.length; i++) {
      const file_data = this.files[i];
      console.log(file_data);

      const data = new FormData();
      data.append('file', file_data);
      data.append('upload_preset', 'youtube_clone');
      data.append('cloud_name', 'dtgaovjxc');
      console.log(data);

      this._service.cloudUpload(data).subscribe((res) => {
        this.Urls.push(res.url);
        console.log(res);

        if (this.Urls.length === this.files.length) {
          this.videoForm.patchValue({
            videoUrl: this.Urls.join(','),
          });
          if (this.videoForm.valid) {
            this._service
              .uploadPost(this.videoForm.getRawValue())
              .subscribe((res) => {
                res;
                this._toastr.success('Video Uploaded Successfully!');
                location.reload();
                this.isLoading = false;
              });
          }
        }
      });
    }
  }
}
