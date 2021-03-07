import { Router } from '@angular/router';
import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component } from "@angular/core";
import { Observable } from 'rxjs';

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string=null;

    constructor(private authservice: AuthService, private router: Router) {

    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;

        if(this.isLoginMode) {
           authObs= this.authservice.logIn(email,password); //Login
        }
        else {
           authObs = this.authservice.signUp(email, password); //signUP...
        }

            authObs.subscribe(resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },errorMessage=> {
                this.error = errorMessage;
                this.isLoading = false;  
            });
        form.reset();
        }
    }