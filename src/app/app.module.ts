import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { LoadinSpinnerComponent } from './shared/loading-spinner/loadingspinner.component';
import { AuthComponent } from './auth/auth.component';
import { RecipeService } from './recipebook/recipe.service';
import { AppRoutingModule } from './app-routing.module';
// import { RouterModule } from '@angular/router';
import { ShoppingListService } from './shopping/shopping-list-service';

import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServerComponent } from './Server/server/server.component';
import { ShoppingListEditComponent } from './shopping/shopping-list-edit/shopping-list-edit.component';
import { RecipeItemComponent } from './recipebook/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipebook/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipebook/recipe-detail/recipe-detail.component';
import { HeaderComponent } from './header/header/header.component';
import { RecipesComponent } from './recipebook/recipes/recipes.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { RecipeStartComponent } from './recipebook/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipebook/recipe-edit/recipe-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    HeaderComponent,
    RecipesComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadinSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ShoppingListService, RecipeService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
