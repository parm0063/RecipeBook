import { ShoppingListService } from './../shopping-list-service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSubscribe: Subscription; 

  constructor(private shoppingListservice: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListservice.getIngredients();
    this.igChangeSubscribe=this.shoppingListservice.ingredientChanged
    .subscribe(
      (ingredients:Ingredient[]) => {
        this.ingredients = ingredients;
    });
  }

  onEditItem(index: number) {
    this.shoppingListservice.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.igChangeSubscribe.unsubscribe();
  }
}
