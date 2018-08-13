import { Component, OnInit, Input} from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router } from '@angular/router';
import { RecipeDataService } from '../recipe-data.service';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
	@Input() public recipe: Recipe;
	

  constructor(private router: Router, private recipeDataService: RecipeDataService,private recipeListComponent: RecipeListComponent) {   
  }

  ngOnInit() {
  }
  upvoteRecipe() : boolean{
  this.recipeDataService.upvoteRecipe(this.recipe.id).subscribe(item => this.recipe = item);
  return false;
  }
  downvoteRecipe() : boolean{
  this.recipeDataService.downvoteRecipe(this.recipe.id).subscribe(item => this.recipe = item);
  return false;
  }

  removeRecipe() : boolean{
  this.recipeDataService.deleteRecipe(this.recipe).subscribe();
  this.recipeListComponent.refresh();
  this.router.navigate(['']);
  return false;
  }

  detailsRecipe() : boolean{
   localStorage.setItem('currentRecipe',this.recipe.id);
  this.router.navigate(['recipe/details/']);
  return
  }

}
