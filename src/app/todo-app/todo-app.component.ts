import { Component, OnInit } from '@angular/core';
import { TodoAppService } from './todo-app.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormGroupName, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddTaskBottomSheet } from './AddTaskBottomSheet/add-task-bottom-sheet.component';
import { EditTaskBottomSheet } from './EditTaskBottomSheet/edit-task-bottom-sheet.component';
import { Router } from '@angular/router';
import { ParticlesConfig } from './particles-config/particles-config';

declare let particlesJS: any;

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
  currentDisplaylingQuote:string = '';
  currentUserFilteredTasks: any = [];
  apiRequestErrorMessage: string = '';
  currentUserCompletedTasks: any = [];
  currentUserUncompletedTasks: any = [];
  areParticlesInvoked: boolean = false;
  quotes: any = [ 'Your limitation—it’s only your imagination.', 'Push yourself, because no one else is going to do it for you.', 'Sometimes later becomes never. Do it now.', 'Great things never come from comfort zones.', 'Dream it. Wish it. Do it.', 'Dream bigger. Do bigger.', 'Do something today that your future self will thank you for.', 'It’s going to be hard, but hard does not mean impossible.' ];
  constructor( private router: Router, private matSnackBar: MatSnackBar, private matBottomSheet: MatBottomSheet, private todoAppService: TodoAppService ) { 
    let y = setInterval( () => {
      this.currentDateTime = Date.now();
    });
    this.getAllLabels();
    this.getAllStatuses();
  }

  ngOnInit() {
    if ( false == this.areParticlesInvoked ) {
      this.invokeParticles();
      this.areParticlesInvoked = true;
    }
    this.currentUserTasks = [];
    this.currentDisplaylingQuote = '';
    this.currentUserUncompletedTasks = [];
    this.currentUserCompletedTasks = [];
    this.getCurrentUserTasks();
    this.getCurrentUserName();
    this.displayRandomQuote();
  }

  async getCurrentUserTasks() {
    this.todoAppService.getTasks().subscribe( response => {
      if( false == response['success'] ) {
        this.apiRequestErrorMessage = response['response'];
      } else {
        this.currentUserTasks = response['response'];
        this.currentUserTasks.forEach( ( element ) => {
          if( 'Completed' == element['status'] ) {
            this.currentUserCompletedTasks.push( element );
          } else {
            this.currentUserUncompletedTasks.push( element )
          }
        } );
        this.isDataPulled = true;
      }
    }, error => {
      this.apiRequestErrorMessage = error['error']['response'];
      return;
    } );
  }

  getCurrentUserName() {
    this.todoAppService.getUserName().subscribe( response => {
      if( false == response['success'] ) {
        this.apiRequestErrorMessage = response['response'];
      } else {
        this.currentUserName = response['response'];
      }
    }, error => {
      this.apiRequestErrorMessage = error['error']['response'];
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
      this.apiRequestErrorMessage = error['error']['response'];
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
      this.apiRequestErrorMessage = error['error']['response'];
      return;
    } );
  }

  getAllLabels() {
    this.todoAppService.getLabels().subscribe( response => {
        if( false == response['success'] ) {
            this.apiRequestErrorMessage = response['response'];
        } else {
            this.allLabels = response['response'];
        }
        }, error => {
        this.apiRequestErrorMessage = error['error']['response'];
        return;
    } );
  }

  getAllStatuses() {
    this.todoAppService.getStatuses().subscribe( response => {
        if( false == response['success'] ) {
            this.apiRequestErrorMessage = response['response'];
        } else {
            this.allStatuses = response['response'];
        }
        }, error => {
        this.apiRequestErrorMessage = error['error']['response'];
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
      this.apiRequestErrorMessage = error['error']['response'];
      return;
  } );
  }

  displayRandomQuote() {
    this.currentDisplaylingQuote = this.quotes[Math.floor( Math.random() * this.quotes.length )];
  }
 
  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }
}