import { Component, OnInit } from '@angular/core';
import { RecipeDataService } from '../recipe-data.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
	private _recipes: Recipe[]
  constructor(private _recipeDataService: RecipeDataService) { }

  ngOnInit() {
  this._recipeDataService.recipes
      .subscribe(items => this._recipes = items);
  }
  get recipes(){
  return this._recipes;
  }
  refresh(){
  this._recipeDataService.recipes
      .subscribe(items => this._recipes = items);
  }

}
