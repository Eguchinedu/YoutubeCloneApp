import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm: FormGroup;
  isLoading: boolean = false;
  constructor(
    private router: Router,
    private _service: ServiceService,
    private _toastr: ToastrService
  ) {
    this.signUpForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      this._service
        .signUp(this.signUpForm.getRawValue())
        .subscribe((result) => {
          console.log(result);
          
          if (result.success == true) {
            this._toastr.success('Account Created Successfully!', 'Success!');
            this.router.navigate(['/login']);
          } else {
            this._toastr.error(result.errorReason, 'Error!');
            this.isLoading = false;
          }
        });
    } else {
      this._toastr.error('Invalid credentials', 'Error!');
      this.isLoading = false;
    }
  }
}
