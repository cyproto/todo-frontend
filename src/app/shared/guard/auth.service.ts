import { Injectable } from '@angular/core';
@Injectable({providedIn: "root"})
export class AuthService {

  constructor() {}

  public isAuthenticated(): boolean {
    if ( sessionStorage.getItem( 'isLoggedIn' ) ) {
        if( JSON.parse( sessionStorage.getItem('isLoggedIn' ) ) ) {
            return true;
        }
        return false;
    }
    return false;
    }
}