import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping/shopping-list-service';
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();
    // recipeSelected = new Subject<Recipe>();
    startEditting = new EventEmitter<number>();

    // private recipes: Recipe[] = [
    //     new Recipe('Tasty Vadapav', 
    //     'this Vadapav is super tasty', 
    //     'https://www.recipetineats.com/wp-content/uploads/2016/01/Beef-Nachos_2b.jpg',
    //     [
    //         new Ingredient('Sause', 1),
    //         new Ingredient('potato', 2)
    // ]),
    //     new Recipe('Burger', 
    //     'Please come and eat delicious Burger', 
    //     'https://www.recipetineats.com/wp-content/uploads/2016/01/Beef-Nachos_2b.jpg',
    //     [
    //         new Ingredient('Buns', 1),
    //         new Ingredient('Meat', 2)
    // ]),
    //   ];

    private recipes: Recipe[] = [];

      constructor(private shoppinglist: ShoppingListService) {

      }

      setRecipe(newRecipe: Recipe[]) {
          this.recipes = newRecipe;
          this.recipeChanged.next(this.recipes.slice());
      }

      getRecipes() {
          return this.recipes.slice();
      }

      addIngredientsToShopping(ingredients: Ingredient[]) {
          this.shoppinglist.addIngredients(ingredients);
      }

      getRecipe(index: number) {
          return this.recipes[index];
      }

      addRecipe(recipe: Recipe) {
          this.recipes.push(recipe);
          this.recipeChanged.next(this.recipes.slice());

      }

      upgradeRecipe(index:number, newRecipe:Recipe) {
          this.recipes[index]= newRecipe;
          this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
          this.recipes.splice(index, 1);
          this.recipeChanged.next(this.recipes.slice());
      }
}