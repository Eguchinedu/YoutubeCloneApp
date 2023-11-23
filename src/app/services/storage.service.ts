import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    let data = localStorage.getItem('token') || '';
    return data;
  }

  getUserInfo(token: string) {
    if (token) {
      return JSON.parse(atob(token.split('.')[1]));
    }
  }
  getUserId() {
    let data = localStorage.getItem('user_id') || '';

    return data;
  }

  setUserId(id: string){
    return localStorage.setItem('user_id', id);
  }
  setEmail(email: string) {
    return localStorage.setItem('email', email);
  }
  getEmail() {
    let data = localStorage.getItem('email') || '';
    return data;
  }
  setUserName(username: string) {
    return localStorage.setItem('username', username);
  }
  getUserName() {
    let data = localStorage.getItem('username') || '';

    return data;
  }
  setFirstName(firstname: string) {
    return localStorage.setItem('firstname', firstname);
  }
  getFirstName() {
    let data = localStorage.getItem('firstname') || '';
    return data;
  }
  isLoggedIn() {
    return this.getToken() ? true : false;
  }
  clear() {
    localStorage.clear();
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['/home']);
    this.toastr.success('Logged out', 'Bye!');
  }
}
