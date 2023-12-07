import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cloudinary } from '@cloudinary/url-gen';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/services/service.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.css'],
})
export class OtherProfileComponent {
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
    private _toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params['otherId'];
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
}
