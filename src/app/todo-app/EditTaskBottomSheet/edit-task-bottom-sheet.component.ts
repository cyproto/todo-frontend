import { Component, OnInit, Inject } from '@angular/core';
import { TodoAppService } from './../todo-app.service';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroupName, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'edit-task-bottom-sheet',
    templateUrl: 'edit-task-bottom-sheet.html',
    styleUrls: ['./edit-task.component.scss']
})
export class EditTaskBottomSheet implements OnInit {

    allStatuses: any = [];
    allLabels: any = [];
    apiRequestErrorMessage: string = '';
    editTaskForm: FormGroup;
    currentTask: any = [];
    constructor( private matSnackBar: MatSnackBar, private formBuilder: FormBuilder, private bottomSheetRef: MatBottomSheetRef<EditTaskBottomSheet>, private todoAppService: TodoAppService, @Inject( MAT_BOTTOM_SHEET_DATA ) public data: any ) {
        this.currentTask = data['task_data'];
        this.allLabels = data['labels'];
        this.allStatuses = data['statuses'];
    }

    ngOnInit() {
        this.editTaskForm = this.formBuilder.group({
            title: null,
            description: null,
            label: null,
            status: null,
            estDate: null,
            priority: null
        });
    }

    updateTask() {
        console.log( this.editTaskForm.value );
        if( null == this.editTaskForm.value.title || '' == this.editTaskForm.value.title ) {
        this.matSnackBar.open( 'Cannot update task without a \'Title\'.', 'Ok', {
            duration: 5000,
        } );
        return;
        }

        let taskFormData = this.editTaskForm.value;
        console.log( taskFormData );
        Object.keys( taskFormData ).forEach( element => {
        if( null == taskFormData[ element ] ) {
            delete taskFormData[ element ];
        }
        } );

        this.todoAppService.updateTask( this.currentTask._id, taskFormData ).subscribe( response => {
        this.matSnackBar.open( response['response'], 'Ok', {
            duration: 5000,
            } );
        this.bottomSheetRef.dismiss();
        event.preventDefault();
        }, error => {
        console.log( error );
        this.apiRequestErrorMessage = error['error']['response'];
        console.log( this.apiRequestErrorMessage );
        return;
        } );
    }

    deleteTask( taskId ) {
        event.stopPropagation();
        this.todoAppService.deleteTask( taskId ).subscribe( response => {
            this.matSnackBar.open( response['response'], 'Ok', {
                duration: 5000,
            } );
            this.bottomSheetRef.dismiss();
            event.preventDefault();
        }, error => {
          console.log( error );
          this.apiRequestErrorMessage = error['error']['response'];
          console.log( this.apiRequestErrorMessage );
          return;
        } );
      }
}