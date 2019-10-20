import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import {environment} from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }


  //Making HTTP GET Request to NodeJS server for fetching all the users in DB.
  getUsers() {
    return this.httpClient.get<any[]>(environment.serverUrl + 'getAllUsers' , {withCredentials:true} );
  }

  //Making HTTP POST Request to NodeJS server for creating new user account.
  postRegister(user:User){
    return this.httpClient.post<any>(environment.serverUrl + 'create', user, {withCredentials:true});
  }

  //Making HTTP POST Request to NodeJS server for validate user login details.
  loginUser(user:User){
    return this.httpClient.post<any>(environment.serverUrl + 'login', user, {withCredentials:true});
  }

  //Making HTTP GET Request to NodeJS server for fetching all the events in DB.
  getEvents() {
   return this.httpClient.get<any[]>(environment.serverUrl + 'events/events' , {withCredentials:true} );
  }

  //Making HTTP POST Request to NodeJS server for creating new event in DB.
  addEvent(event) {
    return this.httpClient.post<any[]>(environment.serverUrl + 'events/create',event , {withCredentials:true} );
   }

   //Making HTTP PUT Request to NodeJS server for updating an exisiting event in DB.
   updateEvent(event) {
    return this.httpClient.put<any[]>(environment.serverUrl + 'events/update',event , {withCredentials:true} );
   }
 

  //Making HTTP POST Request to NodeJS server for creating new comment in an event.
  addEventComment(comment){
    return this.httpClient.post<any>(environment.serverUrl + 'addComment' , comment, {withCredentials:true} );
  }

  //Making HTTP GET Request to NodeJS server for fetching all the comments for specific event in DB.
  getComments(id){
    return this.httpClient.get<any[]>(environment.serverUrl + 'getAllComments/' + id , {withCredentials:true} );
  }

  //Making HTTP DELETE Request to NodeJS server for deleting an event from DB.
  deleteEvent(id){
    return this.httpClient.delete<any[]>(environment.serverUrl + 'events/delete/' + id , {withCredentials:true} );
  }

  deleteComment(id){
    return this.httpClient.delete<any[]>(environment.serverUrl + 'deleteComment/' + id , {withCredentials:true} );
  }

  //Making HTTP DELETE Request to NodeJS server for deleting a user from DB.
  deleteUser(id){
    return this.httpClient.delete<any[]>(environment.serverUrl + 'deleteUser/' + id , {withCredentials:true} );
  }

}
