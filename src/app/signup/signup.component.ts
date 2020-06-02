import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MustMatch } from './password-validator.component';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  submitted: boolean = false;
  formData: any = [];
  public signupForm: FormGroup;
  apiRequestErrorMessage: string = '';
  constructor( private signupService: SignupService, private router: Router, private formBuilder: FormBuilder ) {
  }

  get f() { return this.signupForm.controls; }

  ngOnInit() {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.signupForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(emailRegex)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required],
    }, {
    validator: MustMatch( 'password', 'confirmPassword' )
    });
  }

  onSignup(){
    this.submitted = true;
    if ( this.signupForm.invalid ) {
        return;
    }
    this.formData = this.signupForm.value;
    delete this.formData['confirmPassword'];
    console.log( this.formData );
    this.signupService.addUser( this.formData ).subscribe( response => {
      this.router.navigate( ['/login'], { queryParams: { email: this.signupForm.value.email } } );
    }, error => {
      console.log( error );
      this.apiRequestErrorMessage = error['error']['response'];
      console.log( this.apiRequestErrorMessage );
      return ;
    } );
  }

  onCancel(){
    this.submitted = false;
  }
  
}
