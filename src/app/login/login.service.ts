import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient ) { }

  loginUser( user ) {
    return this.http.post( environment['apiUrl'] + 'login', user, { withCredentials: true } ).pipe();
  }

}
