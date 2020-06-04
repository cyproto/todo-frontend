import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoAppService {

  constructor( private http: HttpClient ) { }

  getTasks() {
    return this.http.get( environment['apiUrl'] + 'tasks', { withCredentials: true } ).pipe();
  }

  getUserName() {
    return this.http.get( environment['apiUrl'] + 'getUserName', { withCredentials: true } ).pipe();
  }

  getStatuses() {
    return this.http.get( environment['apiUrl'] + 'statuses', { withCredentials: true } ).pipe();
  }

  getLabels() {
    return this.http.get( environment['apiUrl'] + 'labels', { withCredentials: true } ).pipe();
  }

  sendTask( task ){
    return this.http.post( environment['apiUrl'] + 'task', task, { withCredentials: true } ).pipe();
  }

  updateTaskCompleted( taskId ) {
    return this.http.put( environment['apiUrl'] + 'completed-task/' + taskId, taskId, { withCredentials: true } ).pipe();
  }

  updateTask( taskId, task ) {
    return this.http.put( environment['apiUrl'] + 'task/' + taskId, task, { withCredentials: true } ).pipe();
  }

  deleteTask( taskId ) {
    return this.http.delete( environment['apiUrl'] + 'task/' + taskId, { withCredentials: true } ).pipe();
  }

  logoutUser() {
    return this.http.delete( environment['apiUrl'] + 'logout', { withCredentials: true } ).pipe();
  }

}
