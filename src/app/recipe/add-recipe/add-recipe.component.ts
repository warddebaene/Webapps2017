import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../ingredient/ingredient.model';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { RecipeDataService } from '../recipe-data.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../user/authentication.service';
import { User } from '../../user/user.model';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  private recipe: FormGroup;
  public readonly unitTypes = ['', 'Liter', 'Gram', 'Tbsp'];  
  private _user: User;
  
  constructor(private fb: FormBuilder, private _recipeDataService: RecipeDataService, private router: Router, private _userDataService: AuthenticationService ) { }

  get ingredients(): FormArray {
    return <FormArray>this.recipe.get('ingredients');
  }
  get recipeForm(): FormGroup{
  return this.recipe;
  }

  ngOnInit() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this._userDataService.getUser(currentUser.id).subscribe(item => this._user = item);
      this.recipe = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      duration: ['', [Validators.required]],
      allergies: ['', [Validators.required]],
      directions: ['', [Validators.required]],
      ingredients: this.fb.array([ this.createIngredients() ])
    });

    this.ingredients.statusChanges.debounceTime(400).distinctUntilChanged().subscribe(data => {
      if (data === 'VALID') {
        this.ingredients.push(this.createIngredients());
      }
    });    
  }


 createIngredients(): FormGroup {
    return this.fb.group({
      amount: [''],
      unit: [''],
      ingredientname: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
  var recipe = new Recipe(this.recipe.value.name,this.recipe.value.duration,this.recipe.value.allergies,this.recipe.value.directions,JSON.parse(localStorage.getItem('currentUser')).username, 1);
    for (const ing of this.recipe.value.ingredients) {
      if (ing.ingredientname.length > 2) {
        const ingredient = new Ingredient(ing.ingredientname, ing.amount, ing.unit );
        recipe.addIngredient(ingredient);
      }      
    }

    
     this._recipeDataService.newRecipeAdded(recipe).subscribe(item => {
      this._userDataService.addRecipeToUser(item.id,this._user).subscribe();
      const ingr = recipe.ingredients.map(ing => 
      this._recipeDataService.addIngredientToRecipe(ing, item));
      
      Observable.forkJoin(...ingr).subscribe( 
      (ingredients: Ingredient[]) => {
        for (const ing of ingredients) {
          item.addIngredient(ing);
        }
        return item;
      });
    this.router.navigate(['']);
    });     
  }
}
