import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [ AuthenticationService ]
})
export class UsersComponent implements OnInit {
	private _users: User[];

  constructor(private _authenticationService: AuthenticationService) { 
  
  }

  ngOnInit() {
  this._authenticationService.allusers.subscribe(
  items => this._users = items
  );
  }
  get users() {
      return this._users;
    }

}
