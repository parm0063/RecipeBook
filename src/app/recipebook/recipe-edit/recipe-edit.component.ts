import { Recipe } from './../recipe.model';
import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from './../../shopping/shopping-list-service';
import { RecipeService } from './../recipe.service';
import { ActivatedRoute, RouterModule, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeservice: RecipeService, private shoppingListService: ShoppingListService, private router:Router) { }

  ngOnInit() {
    this.route.params.
    subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] !=null;
      this.initForm();
    })
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients'])
    console.log(this.recipeForm);
    if(this.editMode) {
      this.recipeservice.upgradeRecipe(this.id, this.recipeForm.value)
    }
    else {
      this.recipeservice.addRecipe(this.recipeForm.value);
    }
    // this.router.navigate(['../]);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo:this.route});
  }

  private initForm() {
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription ='';
    let recipeIngredients = new FormArray([]);


    if(this.editMode) {
      const recipe = this.recipeservice.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']) {
        for(let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required, 
                Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }
  onAddIngredients() {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required, 
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])

    }))
      
  }

  onDeleteIngredient(index:number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
    
    }

  // onEditItems(form: NgForm) {
  //   this.recipeservice.upgradeRecipe(index, newRecipe)

  // }

}
