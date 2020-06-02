import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'signup',
    loadChildren: './signup/signup.module#SignupModule'
  },
  {
    path: 'todo-app',
    loadChildren: './todo-app/todo-app.module#TodoAppModule',
    //canActivate: [AuthGuard]
  },
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
