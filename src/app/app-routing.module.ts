import { AuthComponent } from './auth/auth.component';
import { RecipeResolverService } from './recipebook/recipe-resolver.service';
import { RecipeEditComponent } from './recipebook/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipebook/recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipebook/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipebook/recipes/recipes.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
    {path:'', redirectTo: '/recipes', pathMatch:'full'},
    {path:'recipes', component: RecipesComponent, canActivate:[AuthGuard], children: [
        {path:'', component:RecipeStartComponent},
        {path:'new', component:RecipeEditComponent},
        {path:':id',component:RecipeDetailComponent, resolve: [RecipeResolverService]},
        {path:':id/edit', component:RecipeEditComponent, resolve: [RecipeResolverService]}
    ]},
    {path:'shopping-list', component: ShoppingListComponent },
    {path:'authenticate', component:AuthComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {


}