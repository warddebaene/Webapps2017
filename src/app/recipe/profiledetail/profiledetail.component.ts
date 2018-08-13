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
private _recipes = new Array<Recipe>();

  constructor(private _recipeDataService: RecipeDataService, private _authenticationService: AuthenticationService ) { }

  ngOnInit() {
  this._authenticationService.getUser(localStorage.getItem('selectedUser')).subscribe(
  item =>{ this._user = item

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


  get recipes(){
  return this._recipes;
  }

  seeAll() : boolean{
  return false;
  }

}
