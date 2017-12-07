import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from './ingredient/ingredient.model';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class RecipeDataService {
private _appUrl = 'http://localhost:4200/API/';
private _recipes = new Array<Recipe>();

	constructor(private http: Http) {
	}

	get recipes() : Observable<Recipe[]> {
  	return this.http.get(`${this._appUrl}/recipes`).map(response =>
      response.json().map(item =>
        new Recipe(item.name, item.ingredients)
      )
    );
	}

  getRecipe(id) : Observable<Recipe> {
    return this.http.get(`${this._appUrl}/recipe/${id}/`).map(response =>
      response.json()).map(item =>
        Recipe.fromJSON(item)
      );
  }

  newRecipeAdded(rec): Observable<Recipe> {
    return this.http.post(this._appUrl, rec)
     .map(res => res.json()).map(item =>
        new Recipe(item.name,item.ingredients,item.directions,item._id));
  }

  addIngredientToRecipe(ing: Ingredient, rec: Recipe): Observable<Ingredient> {
    return this.http.post(`http://localhost:4200/API/recipe/${rec.id}/ingredients`, ing)
        .map(res => res.json())
        .map(item => Ingredient.fromJSON(item));
  }

}
