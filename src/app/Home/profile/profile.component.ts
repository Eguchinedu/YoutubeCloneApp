import { Component, OnInit } from '@angular/core';
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

  constructor(
    private _service: ServiceService,
    private _storage: StorageService
  ) {
    this.id = this._storage.getUserId();
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
}
