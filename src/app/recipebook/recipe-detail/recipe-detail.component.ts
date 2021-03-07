import { Ingredient } from './../../shared/ingredient.model';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipedetails: Recipe;
  id:number;


  constructor(private recipeservice: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() { 
    this.route.params.
    subscribe((params: Params) => {
      this.id= +params['id'];
      this.recipedetails = this.recipeservice.getRecipe(this.id)
})   }

  onAddShopping() {
    this.recipeservice.addIngredientsToShopping(this.recipedetails.ingredients);
  }

  editRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeservice.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }


}
