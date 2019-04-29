import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { FilmComponent } from './film/film.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthService } from 'src/shared/auth.service';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthService]},
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthService]},
  { path: 'search', component: SearchComponent},
  { path: 'film', component: FilmComponent},
  { path: 'review', component: ReviewComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}