import { Component, OnInit } from '@angular/core';
import { RecipeDataService } from '../recipe-data.service';
import { Recipe } from '../recipe.model';
import { AuthenticationService } from '../../user/authentication.service';
import { User } from '../../user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiledetail',
  templateUrl: './profiledetail.component.html',
  styleUrls: ['./profiledetail.component.css']
})
export class ProfiledetailComponent implements OnInit {
private _user : User;
private _isFriend : boolean;
private _buttonvalue : string;
private _loggedinUser : User;

  constructor(private _recipeDataService: RecipeDataService, private router: Router, private _authenticationService: AuthenticationService ) {}

  ngOnInit() {

  
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this._authenticationService.getUser(currentUser.id).subscribe(item =>{ 
      this._loggedinUser = item
      if(this._loggedinUser.friends.includes(localStorage.getItem('selectedUser'))){
        this._buttonvalue = "friends";
        (<HTMLInputElement> document.getElementById("button")).disabled = true;
      }
      else{
        this._buttonvalue = "add friend";
        }
      });

  this._authenticationService.getUser(localStorage.getItem('selectedUser')).subscribe(
  item =>{ this._user = item
if(this._user.id === this._loggedinUser.id){
        this._buttonvalue = "yourself";
        (<HTMLInputElement> document.getElementById("button")).disabled = true;
      }
  });
  }

  get user() : User{
  return this._user;
  }
  get buttonvalue() : string{
  return this._buttonvalue;
  }

  addFriend() : boolean{
  this._authenticationService.addFriendToUser(this.user.id,this._loggedinUser.id).subscribe(item => {
  this.router.navigate(['/friends']);
  });
  
  return false;
  }
  seeAll() : boolean{
  return false;
  }

}
