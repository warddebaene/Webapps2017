import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeDataService } from '../recipe-data.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	private _recipe: Recipe;

  constructor(private recipeDataService: RecipeDataService) { }

  get recipe() : Recipe{
  return this._recipe;
  }

  ngOnInit() {
  this.recipeDataService.getRecipe(localStorage.getItem('currentRecipe')).subscribe(item => this._recipe = item);
  }

}
