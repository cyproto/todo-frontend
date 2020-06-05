import { Component, OnInit } from '@angular/core';
import { TodoAppService } from './../todo-app.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormGroupName, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'add-task-bottom-sheet',
    templateUrl: 'add-task-bottom-sheet.html',
    styleUrls: ['./add-task.component.scss']
})
export class AddTaskBottomSheet implements OnInit {

    allStatuses: any = [];
    allLabels: any = [];
    apiRequestErrorMessage: string = '';
    newTaskForm: FormGroup;
    constructor( private matSnackBar: MatSnackBar, private formBuilder: FormBuilder, private bottomSheetRef: MatBottomSheetRef<AddTaskBottomSheet>, private todoAppService: TodoAppService ) {
        this.getAllLabels();
    }

    ngOnInit() {
        this.newTaskForm = this.formBuilder.group({
        title: null,
        description: null,
        label: null,
        status: null,
        estDate: null,
        priority: null
        });
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

    addTask() {
        console.log( this.newTaskForm.value );
        if( null == this.newTaskForm.value.title || '' == this.newTaskForm.value.title ) {
        this.matSnackBar.open( 'Cannot create task without a \'Title\'.', 'Ok', {
            duration: 5000,
        } );
        return;
        }

        let taskFormData = this.newTaskForm.value;
        Object.keys( taskFormData ).forEach( element => {
        if( null == taskFormData[ element ] ) {
            delete taskFormData[ element ];
        }
        } );

        this.todoAppService.sendTask( taskFormData ).subscribe( response => {
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