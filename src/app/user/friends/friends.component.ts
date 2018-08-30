import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  private _friends = new Array<User>();
	private _user : User;

  constructor(private _authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if(this.router.url == "/friends"){
  localStorage.setItem('selectedUser',currentUser.id);
  }
  this._authenticationService.getUser(localStorage.getItem('selectedUser')).subscribe(item =>{ 
  this._user = item
  for(let entry in this._user.friends){
  this._authenticationService.getUser(this._user.friends[entry])
      .subscribe(
      user => this._friends.push(user)
      )
      }
  });  
  }


  get friends(){
  return this._friends;
  }
  test() : boolean{
  return false;
  }
get user(){
  
  return this._user;
  }

}
