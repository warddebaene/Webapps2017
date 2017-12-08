import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { RecipeModule } from '../recipe/recipe.module';
import { AuthGuardService } from './../user/auth-guard.service';

const appRoutes: Routes = [  
  {
    path: 'recipe',
    canActivate: [ AuthGuardService ],
    loadChildren: '../recipe/recipe.module#RecipeModule'
  },
  { path: '', redirectTo: 'recipe/list', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes,
      {preloadingStrategy: PreloadAllModules})
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }


