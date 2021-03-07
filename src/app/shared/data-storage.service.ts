import { AuthService } from './../auth/auth.service';
// import { Ingredient } from './ingredient.model';
import { Recipe } from './../recipebook/recipe.model';
import { RecipeService } from './../recipebook/recipe.service';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    // recipes: Recipe;
    // loadRecipes: Recipe[] =[];

    constructor(private http: HttpClient,private recipeService: RecipeService,private authservice:AuthService) {
    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        this.http.put('https://recipebook-b0ea9-default-rtdb.firebaseio.com/recipes.json', 
        recipes).subscribe(response => {
            console.log(response);            // this.loadRecipes = recipes;
        })
    }

    fetchRecipes() {
            return this.http.get<Recipe[]>(
                'https://recipebook-b0ea9-default-rtdb.firebaseio.com/recipes.json'
            )
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {...recipe, 
                            ingredients: recipe.ingredients ? recipe.ingredients : [] 
                }
            });
        }),
        tap(recipes => {
            this.recipeService.setRecipe(recipes);
        })
        )
    }

}