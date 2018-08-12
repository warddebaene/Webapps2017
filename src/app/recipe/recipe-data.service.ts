import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from './ingredient/ingredient.model';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthenticationService } from '../user/authentication.service';

@Injectable()
export class RecipeDataService {
private _appUrl = 'http://localhost:4200/API/';
private _recipes = new Array<Recipe>();

	constructor(private http: Http, private auth: AuthenticationService) {
	}

	get recipes() : Observable<Recipe[]> {
  	return this.http.get(`${this._appUrl}/recipes`).map(response =>
      response.json().map(item =>
        new Recipe(item.name, item.duration, item.allergies, item.directions, item.creator, item.likes ,item.ingredients, item._id)
      )
    );
	}

  getRecipe(id) : Observable<Recipe> {
    return this.http.get(`${this._appUrl}/recipe/${id}/`,{ headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) }).map(response =>
      response.json()).map(item =>
        Recipe.fromJSON(item)
      );
  }

  upvoteRecipe(id) : Observable<Recipe> {
    return this.http.get(`${this._appUrl}/upvote/${id}/`,{ headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) }).map(response =>
      response.json()).map(item =>
        Recipe.fromJSON(item)
      );
  }

  downvoteRecipe(id) : Observable<Recipe> {
    return this.http.get(`${this._appUrl}/downvote/${id}/`,{ headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) }).map(response =>
      response.json()).map(item =>
        Recipe.fromJSON(item)
      );
  }

  newRecipeAdded(rec): Observable<Recipe> {
    return this.http.post(`${this._appUrl}/recipes`, rec,{ headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) })
     .map(res => res.json()).map(item =>
        new Recipe(item.name, item.duration, item.allergies, item.directions,item.creator,item.likes,item.ingredients,item._id));
  }

  deleteRecipe(rec): Observable<Recipe> {
    return this.http.delete(`${this._appUrl}/recipe/${rec.id}`,{ headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) })
     .map(res => res.json()).map(item =>
        Recipe.fromJSON(item));
  }

  addIngredientToRecipe(ing: Ingredient, rec: Recipe): Observable<Ingredient> {
    return this.http.post(`${this._appUrl}recipe/${rec.id}/ingredients`, ing)
        .map(res => res.json())
        .map(item => Ingredient.fromJSON(item));
  }

}

