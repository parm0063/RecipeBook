import { Subscription } from 'rxjs';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recepiservice: RecipeService, 
              private route:Router,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.recipes=this.recepiservice.getRecipes();
    this.subscription = this.recepiservice.recipeChanged
    .subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    })
  }

  newRecipe() {
    this.route.navigate(['new'], {relativeTo:this.router});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
