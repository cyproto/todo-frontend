import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted: boolean = false;
  public loginForm: FormGroup;
  autoFillEmail: string = '';
  formData: any = [];
  apiRequestErrorMessage: string = '';
  constructor( private loginService: LoginService, public activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    sessionStorage.setItem('isLoggedIn',JSON.stringify('false'));
  }

  ngOnInit() {
    sessionStorage.clear();
    this.activatedRoute.queryParams.subscribe( params => {
      this.autoFillEmail = params['email'];
    });

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.loginForm = this.formBuilder.group({
        email: [null, [Validators.required, Validators.pattern( emailRegex )]],
        password: [null, Validators.required]
    });
  }
  
  get f() { return this.loginForm.controls; }

  onLogin() {
    this.submitted = true;
    if ( this.loginForm.invalid ) {
        return;
    }
    this.formData = this.loginForm.value;
    this.loginService.loginUser( this.formData ).subscribe( response => {
      if( false == response['success'] ) {
        this.apiRequestErrorMessage = response['response'];
      } else {
        sessionStorage.setItem( 'isLoggedIn', JSON.stringify( 'true' ) );
        this.router.navigate( ['/todo-app'] );
      }
    }, error => {
      this.apiRequestErrorMessage = error['error']['response'];
      return;
    } );
  }

}
