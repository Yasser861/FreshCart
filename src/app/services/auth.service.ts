import { Injectable } from '@angular/core';
import {HttpClient}from '@angular/common/http'
import { Observable ,BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData=new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient, private _Router:Router) { 
    if(localStorage.getItem('userToken')!=null){
      this.decoded();
    }
  }
  decoded(){
    let encodedToken=JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken:any=jwtDecode(encodedToken);
    this.userData.next(decodedToken);
  }
  signUp(data:object):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',data)
  }
  signIn(data:object):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',data)
  }
  logOut(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }
}
