
import { User } from '../user.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
@Input() public user: User;
  private _loggedinUser: User;
  constructor(private router: Router, private _authenticationService: AuthenticationService) { }

  ngOnInit() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this._authenticationService.getUser(currentUser.id).subscribe(item => this._loggedinUser = item);
      

  }
  removeRecipe() : boolean{
  //this._authenticationService.addFriend(this.user).subscribe();
  //this.router.navigate(['']);
  return false;
  }
  viewProfile() : boolean{

  localStorage.setItem('selectedUser',this.user.id);
  if(this.router.url == "/users")
    this.router.navigate(['/recipe/profile']);
  else    
    window.location.reload();
  return;
  }

  addFriend() : boolean{
  this._authenticationService.addFriendToUser(this.user.id,this._loggedinUser.id).subscribe();
  return false;
  }

}
