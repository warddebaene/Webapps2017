import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
	private _user : User;
	private _friends : User[];

  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit() {
  //this._authenticationService.getUserFriends(JSON.parse(localStorage.getItem('currentUser')).id).subscribe(item => this._friends =item.friends);
  }
get user(){
  
  return this._user;
  }
  get friends(){

  return this._friends;
  }

}
