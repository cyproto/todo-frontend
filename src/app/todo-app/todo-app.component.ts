import { Component, OnInit } from '@angular/core';
import { TodoAppService } from './todo-app.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormGroupName, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddTaskBottomSheet } from './AddTaskBottomSheet/add-task-bottom-sheet.component';
import { EditTaskBottomSheet } from './EditTaskBottomSheet/edit-task-bottom-sheet.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss']
})
export class TodoAppComponent implements OnInit {

  allLabels: any = [];
  allStatuses: any = [];
  currentDateTime: any;
  currentUserTasks: any = [];
  currentUserName: string = '';
  isDataPulled: boolean = false;
  isMouseHovering: boolean = false;
  currentUserFilteredTasks: any = [];
  apiRequestErrorMessage: string = '';
  currentUserCompletedTasks: any = [];
  currentUserUncompletedTasks: any = [];

  constructor( private router: Router, private matSnackBar: MatSnackBar, private matBottomSheet: MatBottomSheet, private todoAppService: TodoAppService ) { 
    setInterval( () => {
      this.currentDateTime = Date.now();
    });
    this.getAllLabels();
    this.getAllStatuses();
  }

  ngOnInit() {
    this.currentUserTasks = [];
    this.currentUserUncompletedTasks = [];
    this.currentUserCompletedTasks = [];
    this.getCurrentUserTasks();
    this.getCurrentUserName();
  }

  async getCurrentUserTasks() {
    this.todoAppService.getTasks().subscribe( response => {
      if( false == response['success'] ) {
        this.apiRequestErrorMessage = response['response'];
      } else {
        this.currentUserTasks = response['response'];
        console.log( this.currentUserTasks );
        this.currentUserTasks.forEach( ( element ) => {
          if( 'Completed' == element['status'] ) {
            this.currentUserCompletedTasks.push( element );
          } else {
            this.currentUserUncompletedTasks.push( element )
          }
        } );
        this.isDataPulled = true;
        console.log( this.currentUserTasks );
        console.log( this.currentUserCompletedTasks );
      }
    }, error => {
      console.log( error );
      this.apiRequestErrorMessage = error['error']['response'];
      console.log( this.apiRequestErrorMessage );
      return;
    } );
  }

  getCurrentUserName() {
    this.todoAppService.getUserName().subscribe( response => {
      if( false == response['success'] ) {
        this.apiRequestErrorMessage = response['response'];
      } else {
        this.currentUserName = response['response'];
        console.log( this.currentUserName );
      }
    }, error => {
      console.log( error );
      this.apiRequestErrorMessage = error['error']['response'];
      console.log( this.apiRequestErrorMessage );
      return;
    } );
  }

  addTask() {
    this.matBottomSheet.open( AddTaskBottomSheet ).afterDismissed().subscribe( () => {
      this.isDataPulled = false;
      this.ngOnInit();
    });
  }

  editTask( task ) {
    let data: any = {};
    data['task_data'] = task;
    data['statuses'] = this.allStatuses;
    data['labels'] = this.allLabels;
    this.matBottomSheet.open( EditTaskBottomSheet, {
      data: data }
       ).afterDismissed().subscribe( () => {
      this.isDataPulled = false;
      this.ngOnInit();
    });
  }

  markTaskCompleted( taskId, event ) {
    event.stopPropagation();
    this.todoAppService.updateTaskCompleted( taskId ).subscribe( response => {
      this.matSnackBar.open( response['response'], 'Ok', {
        duration: 5000,
      } );
      this.isDataPulled = false;
      this.ngOnInit();
    }, error => {
      console.log( error );
      this.apiRequestErrorMessage = error['error']['response'];
      console.log( this.apiRequestErrorMessage );
      return;
    } );
  }

  deleteTask( taskId, event ) {
    event.stopPropagation();
    this.todoAppService.deleteTask( taskId ).subscribe( response => {
      this.matSnackBar.open( response['response'], 'Ok', {
        duration: 5000,
      } );
      this.isDataPulled = false;
      this.ngOnInit();
    }, error => {
      console.log( error );
      this.apiRequestErrorMessage = error['error']['response'];
      console.log( this.apiRequestErrorMessage );
      return;
    } );
  }

  getAllLabels() {
    this.todoAppService.getLabels().subscribe( response => {
        if( false == response['success'] ) {
            this.apiRequestErrorMessage = response['response'];
        } else {
            this.allLabels = response['response'];
            console.log( this.allLabels );
        }
        }, error => {
        console.log( error );
        this.apiRequestErrorMessage = error['error']['response'];
        console.log( this.apiRequestErrorMessage );
        return;
    } );
  }

  getAllStatuses() {
    this.todoAppService.getStatuses().subscribe( response => {
        if( false == response['success'] ) {
            this.apiRequestErrorMessage = response['response'];
        } else {
            this.allStatuses = response['response'];
            console.log( this.allStatuses );
        }
        }, error => {
        console.log( error );
        this.apiRequestErrorMessage = error['error']['response'];
        console.log( this.apiRequestErrorMessage );
        return;
    } );
  }

  onSearchChange( searchElement ){
    const filterValue = searchElement.toLowerCase();
    this.currentUserFilteredTasks = this.currentUserTasks.filter( task => 
      task.title.toLowerCase().includes( filterValue )  || 
      task.priority.toLowerCase().includes( filterValue )  ||
      task.label.toLowerCase().includes( filterValue )  ||
      task.status.toLowerCase().includes( filterValue )
    );
  }

  logoutCurrentUser() {
    this.todoAppService.getLabels().subscribe( response => {
      if( false == response['success'] ) {
          this.apiRequestErrorMessage = response['response'];
      } else {
        sessionStorage.setItem( 'isLoggedIn', JSON.stringify( 'false' ) );
        this.router.navigate( ['/login'] );
      }
      }, error => {
      console.log( error );
      this.apiRequestErrorMessage = error['error']['response'];
      console.log( this.apiRequestErrorMessage );
      return;
  } );
  }

}