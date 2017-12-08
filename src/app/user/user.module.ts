import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './auth-guard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import {HttpModule} from '@angular/http';
import { LogoutComponent } from './logout/logout.component';
import { FriendsComponent } from './friends/friends.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';

const routes = [
  { path: 'login', component: LoginComponent },  
  { path: 'logout', component: LogoutComponent },
  { path: 'users', component: UsersComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent, RegisterComponent, LogoutComponent, FriendsComponent, UserDetailComponent, UsersComponent],
  providers: [
    AuthenticationService,
    AuthGuardService
  ],
  exports: [
  ]
})
export class UserModule { }
