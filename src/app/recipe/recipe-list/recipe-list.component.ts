import { Component, OnInit } from '@angular/core';
import { RecipeDataService } from '../recipe-data.service';
import { Recipe } from '../recipe.model';
import { AuthenticationService } from '../../user/authentication.service';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
	private _recipes = new Array<Recipe>();
  private _user: User;
  constructor(private _recipeDataService: RecipeDataService, private _userDataService: AuthenticationService ) { }

  ngOnInit() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  this._userDataService.getUser(localStorage.getItem('selectedUser')).subscribe(item =>{ 
  this._user = item
  for(let entry in this._user.recipes){
  this._recipeDataService.getRecipe(this._user.recipes[entry])
      .subscribe(rec => this._recipes.push(rec))
      }  
  });
  localStorage.setItem('selectedUser', currentUser.id)
  }
  get recipes(){
  return this._recipes;
  }
  refresh(){
  this._recipeDataService.recipes
      .subscribe(items => this._recipes = items);
  }

}
