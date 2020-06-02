import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  userCollection: any = null;

  constructor( private http: HttpClient ) { 
  }

  addUser( user ){
    console.log( user );
    console.log( environment['apiUrl'] + 'register' );
    return this.http.post( environment['apiUrl'] + 'register', user ).pipe();
  }
}
