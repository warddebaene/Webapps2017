import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDataService } from './recipe-data.service';
import { HttpModule} from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolver } from './recipe-resolver.service';

const routes = [
  { path: 'list', component: RecipeListComponent },
  { path: 'add', component: AddRecipeComponent },
  { path: 'details', component: RecipeDetailComponent },
  { path: ':id', component: RecipeDetailComponent, resolve: { recipe: RecipeResolver} }
];

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
  RecipeComponent,
    IngredientComponent,
    AddRecipeComponent,
    RecipeListComponent,
    RecipeDetailComponent],
    providers: [ RecipeDataService,
    RecipeResolver ]
})
export class RecipeModule { }
