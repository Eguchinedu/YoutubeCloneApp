import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { HomeComponent } from './Home/home.component';
import { PostComponent } from './Home/post/post.component';
import { LoginComponent } from './Authentication/login/login.component';
import { SignUpComponent } from './Authentication/sign-up/sign-up.component';
import { ProfileComponent } from './Home/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {CloudinaryModule} from '@cloudinary/ng';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SpinnerComponent } from './Components/spinner/spinner.component';
import { LoadingInterceptor } from './Interceptor/loading.interceptor';
import { TokenInterceptor } from './Interceptor/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    PostComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CloudinaryModule,
    NgxDropzoneModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
