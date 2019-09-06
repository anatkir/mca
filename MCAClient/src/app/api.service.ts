import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import {environment} from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  postRegister(user:User){
    return this.httpClient.post<any>(environment.serverUrl + 'create', user, {withCredentials:true});
  }

  loginUser(user:User){
    return this.httpClient.post<any>(environment.serverUrl + 'login', user, {withCredentials:true});
  }

  getEvents() {
   return this.httpClient.get<any[]>(environment.serverUrl + 'events' , {withCredentials:true} );
  }

  addEventComment(comment){
    return this.httpClient.post<any>(environment.serverUrl + 'addComment' , comment, {withCredentials:true} );
  }

  getComments(id){
    return this.httpClient.get<any[]>(environment.serverUrl + 'getAllComments/' + id , {withCredentials:true} );
  }

}