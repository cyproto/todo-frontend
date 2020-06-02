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
    console.log( this.formData );
    this.loginService.loginUser( this.formData ).subscribe( response => {
      if( false == response['success'] ) {
        this.apiRequestErrorMessage = response['response'];
      } else {
        this.router.navigate( ['/todo-app'] );
      }
    }, error => {
      console.log( error );
      this.apiRequestErrorMessage = error['error']['response'];
      console.log( this.apiRequestErrorMessage );
      return;
    } );
    // const userRef = this.usersCollection.doc(this.loginForm.value.email);
    // userRef.get().toPromise().then((docSnapshot) => {
    //   if ( !docSnapshot.exists ) {
    //       this.userExistsFlag = false;
    //       return;
    //   } else {
    //     this.userExistsFlag = true;
    //     this.usersCollection.doc(this.loginForm.value.email).valueChanges().subscribe( result => {
    //         if( true ) {
    //           console.log('login');
    //           this.wrongPasswordFlag = false;
    //           sessionStorage.setItem('isLoggedIn',JSON.stringify('true'));
    //           sessionStorage.setItem('userEmail',this.loginForm.value.email);
    //           sessionStorage.setItem('isExamSubmittedFlag',result.isExamSubmittedFlag);
    //           sessionStorage.setItem('isGivingTestFirstTimeFlag',result.isGivingTestFirstTimeFlag);
    //           this.router.navigate(['/exam-app']);
    //           this.loginForm.reset();
    //         } else {
    //           console.log('wrong pass');
    //           this.wrongPasswordFlag = true;
    //           sessionStorage.setItem('isLoggedIn',JSON.stringify('false'));
    //         }
    //       });
    //   }
    // });
  }

}
