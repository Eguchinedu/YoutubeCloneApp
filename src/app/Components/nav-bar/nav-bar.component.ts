import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(
    private toastr: ToastrService,
    private _storage: StorageService
  ) {}
  isLoggedIn() {
    return this._storage.isLoggedIn();
  }
  signOut() {
    this._storage.signOut();
  }
}
