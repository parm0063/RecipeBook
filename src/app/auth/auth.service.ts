import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData {
    kind: string;
    idToken: string;          //optional.getting data
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokeExpirationTimer: any

    constructor(private http: HttpClient, private router: Router) {

    }

    signUp(email:string,password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnVMu6g5qo80beuM2VhKc10U4ULkoDnyk',
            {
                email: email,
                password: password,
                returnSecureToken: true
        })//it will get authresponsedata back so post<>..
        .pipe(catchError(this.handleError),
            tap(resData=> {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            }));
    }

    logIn(email:string, password:string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnVMu6g5qo80beuM2VhKc10U4ULkoDnyk', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError), 
            tap(resData => {
                this.handleAuthentication(
                    resData.email, 
                    resData.localId, 
                    resData.idToken, 
                    +resData.expiresIn) //+ for number
            }));
    }

    autoLogin() { //allow to automatic login

        const userData: {
            email: string;
            id:string;
            _token: string;
            _tokenExpirationDate : string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData) {
            return;
        }
        const loadedUser = new User(
            userData.email, 
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if(loadedUser.token) {
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
            this.user.next(loadedUser);
        }

    }

    logOut() {
        this.user.next(null);
        this.router.navigate(['/authenticate']);
        localStorage.removeItem('userData');
        if(this.tokeExpirationTimer) {
            clearTimeout(this.tokeExpirationTimer);
        }

        this.tokeExpirationTimer = null;

    }

    autoLogout(expirationDuration: number) {
        this.tokeExpirationTimer= setTimeout(() => {
            this.logOut();
        }, expirationDuration)

    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
            const expirationDate = new Date(
                new Date().getTime() + expiresIn * 1000
            );
            const user = new User(
                email, 
                userId, 
                token, 
                expirationDate
            );
            this.user.next(user);
            this.autoLogout(expiresIn * 1000);
            localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured';
        if(!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'Email already exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage= 'Email does not exist';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Password is invalid';
                break;
        }
        return throwError(errorMessage);

    }

}