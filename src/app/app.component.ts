import { AuthService } from './auth/auth.service';
import { RecipesComponent } from './recipebook/recipes/recipes.component';
import { RecipeDetailComponent } from './recipebook/recipe-detail/recipe-detail.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';

  constructor(private authService: AuthService){

  }
//when start our app so that's why doing here!!!
  ngOnInit() {
    this.authService.autoLogin();
  }

}


