import { Component, OnInit } from '@angular/core';
import { RecipeDataService } from '../recipe-data.service';
import { Recipe } from '../recipe.model';
import { AuthenticationService } from '../../user/authentication.service';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-profiledetail',
  templateUrl: './profiledetail.component.html',
  styleUrls: ['./profiledetail.component.css']
})
export class ProfiledetailComponent implements OnInit {
private _user : User;
private _isFriend : boolean;
private _buttonvalue : string;

  constructor(private _recipeDataService: RecipeDataService, private _authenticationService: AuthenticationService ) {}

  ngOnInit() {

  
      document.getElementById('button').disabled = true; 
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this._authenticationService.getUser(currentUser.id).subscribe(item =>{ 
      this._loggedinUser = item
      if(this._loggedinUser.friends.includes(localStorage.getItem('selectedUser'))){
        this._buttonvalue = "friends";
      }
      else{
        document.getElementById('button').disabled = false;
        this._buttonvalue = "add friend";
        }
      });

  this._authenticationService.getUser(localStorage.getItem('selectedUser')).subscribe(
  item =>{ this._user = item
if(this._user.id === this._loggedinUser.id){
        this._buttonvalue = "yourself";
        document.getElementById('button').disabled = true;
      }
  for(let entry in this._user.recipes){
  this._recipeDataService.getRecipe(this._user.recipes[entry])
      .subscribe(
      rec => 
      this._recipes.push(rec))
      }
  });
  }

  get user() : User{
  return this._user;
  }
  get test() : boolean{
  return _isFriend;
  }

  get buttonvalue() : string{
  return this._buttonvalue;
  }

  addFriend() : boolean{
  this._authenticationService.addFriendToUser(this.user.id,this._loggedinUser.id).subscribe();
  
  document.getElementById('button').disabled = true;
  return false;
  }
  seeAll() : boolean{
  return false;
  }

}
