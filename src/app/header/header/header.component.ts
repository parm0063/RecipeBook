import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { DataStorageService } from './../../shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/recipebook/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loadRecipes: Recipe[]= [];
  isLoggedIn = false;
  private userSub: Subscription;

  constructor(private dataStorage: DataStorageService, private authservice: AuthService) { }

  ngOnInit() {
    this.userSub = this.authservice.user.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  onSave() {
    this.dataStorage.storeRecipes();
  }

  onFetch() {
    this.dataStorage.fetchRecipes().subscribe();
  }

  onLogOut() {
    this.authservice.logOut();
    }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
