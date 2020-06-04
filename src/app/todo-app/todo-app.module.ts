import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoAppComponent } from './todo-app.component';
import { TodoAppRoutingModule } from './todo-app-routing.module';
import {
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatButtonModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatSelectModule,
  MatOptionModule,
  MatDialogModule,
  MatGridListModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule, 
  MatRippleModule,
  MatBottomSheetModule,
  MatProgressSpinnerModule,
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddTaskBottomSheet } from './AddTaskBottomSheet/add-task-bottom-sheet.component';
import { EditTaskBottomSheet } from './EditTaskBottomSheet/edit-task-bottom-sheet.component';

@NgModule({
  declarations: [
    TodoAppComponent, 
    AddTaskBottomSheet,
    EditTaskBottomSheet
  ],
  imports: [
    CommonModule,
    TodoAppRoutingModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatGridListModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    AddTaskBottomSheet,
    EditTaskBottomSheet,
  ],
  providers: [
    MatSnackBar,
  ]
})
export class TodoAppModule { }
