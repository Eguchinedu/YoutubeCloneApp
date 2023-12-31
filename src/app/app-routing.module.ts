import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/home.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { LoginComponent } from './Authentication/login/login.component';
import { SignUpComponent } from './Authentication/sign-up/sign-up.component';
import { PostComponent } from './Home/post/post.component';
import { ProfileComponent } from './Home/profile/profile.component';
import { AuthGuard} from './Guard/auth.guard';
import { OtherProfileComponent } from './home/other-profile/other-profile.component';


const routes: Routes = [
  {
     
    path: ':userId/:postId/:otherId',
    component: OtherProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: ':userId/:postId',
    component: PostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
