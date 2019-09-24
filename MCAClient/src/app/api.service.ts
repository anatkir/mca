import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import {environment} from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getUsers() {
    return this.httpClient.get<any[]>(environment.serverUrl + 'getAllUsers' , {withCredentials:true} );
  }

  constructor(private httpClient:HttpClient) { }

  postRegister(user:User){
    return this.httpClient.post<any>(environment.serverUrl + 'create', user, {withCredentials:true});
  }

  loginUser(user:User){
    return this.httpClient.post<any>(environment.serverUrl + 'login', user, {withCredentials:true});
  }

  getEvents() {
   return this.httpClient.get<any[]>(environment.serverUrl + 'events/events' , {withCredentials:true} );
  }

  addEvent(event) {
    return this.httpClient.post<any[]>(environment.serverUrl + 'events/create',event , {withCredentials:true} );
   }
 

  addEventComment(comment){
    return this.httpClient.post<any>(environment.serverUrl + 'addComment' , comment, {withCredentials:true} );
  }

  getComments(id){
    return this.httpClient.get<any[]>(environment.serverUrl + 'getAllComments/' + id , {withCredentials:true} );
  }

  deleteEvent(id){
    return this.httpClient.delete<any[]>(environment.serverUrl + 'events/delete/' + id , {withCredentials:true} );
  }

}
