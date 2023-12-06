import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/services/service.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
isLoading: boolean = false;
  loginForm: FormGroup;
  user!: any;

  constructor(private router: Router, private _service: ServiceService, private _toastr : ToastrService, private _storage : StorageService) {
this.loginForm = new FormGroup({
  userName: new FormControl(null, [Validators.required]),
  password: new FormControl(null, [Validators.required])
})
  }

  onSubmit(){
if (this.loginForm.valid) {
  this.isLoading = true;
  this._service.login(this.loginForm.getRawValue()).subscribe(
    (data) => {
      this.user = this._storage.getUserInfo(data.token);

      if (data.success === true) {
        this._toastr.success('Welcome user');
        this._storage.storeToken(data.token);
        this._storage.setUserName(this.user.Username);
        this._storage.setFirstName(this.user.Firstname);
        this._storage.setUserId(this.user.Id);
        this._toastr.success('Logged in successfully', 'Success!');
        this.router.navigate(['/home']);
      }
    },
    (error) => {
      console.log(error);
    
      this._toastr.error(error.errorReason, 'Error!');
      this.isLoading = false;
    }
  );
} else {
  this._toastr.error('Please fill all required fields', 'Error!');
      this.isLoading = false;


}

}
}
