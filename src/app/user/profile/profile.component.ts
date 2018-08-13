import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
private _user : User;

  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit() {
  this._authenticationService.getUser(localStorage.getItem('selectedUser')).subscribe(
  item => this._user = item
  );
  }

  get user() : User{
  return this._user;
  }

}
