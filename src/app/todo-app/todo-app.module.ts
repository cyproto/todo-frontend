import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoAppComponent } from './todo-app.component';
import { TodoAppRoutingModule } from './todo-app-routing.module';

@NgModule({
  declarations: [TodoAppComponent],
  imports: [
    CommonModule,
    TodoAppRoutingModule
  ]
})
export class TodoAppModule { }
