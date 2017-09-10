import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user:any;

  constructor(private http: Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //sends user data to the backend
    return this.http.post('http://localhost:3000/users/register',user,{headers: headers})
    .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //sends user data to the backend
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers: headers})
    .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    //gives access to the token
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    //sends user data to the backend
    return this.http.get('http://localhost:3000/users/profile',{headers: headers})
    .map(res => res.json());
  }

  storeUserData(token, user){
    //local storage can only store strings
    localStorage.setItem('id_token',token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    //grab token from local storage
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired();
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}