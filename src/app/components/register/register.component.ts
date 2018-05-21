import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginform = new FormGroup({
    username: new FormControl("",[
      Validators.minLength(5),
      Validators.required,
      //Validators
    ]),
    email: new FormControl("",Validators.minLength(5)),
    password: new FormControl("",Validators.minLength(5)),
    repassword: new FormControl("",Validators.minLength(5)),
    // Email: new FormControl([
    //   Validators.required,
    //   Validators.email,
    // ]),
    // Password: new FormControl([
    //   Validators.required,
    //   Validators.email,
    // ]),
    // RePassword: new FormControl([
    //   Validators.required,
    //   Validators.email,
    // ]),
  });
  get username(): any { return this.loginform.get('username'); }
  get email(): any { return this.loginform.get('email'); }
  get password(): any { return this.loginform.get('password'); }
  get repassword(): any { return this.loginform.get('rePassword'); }

  constructor() { }

  ngOnInit() {
  }


  // onSubmit(): void {
  //   console.log(this.form.value);  // {first: 'Nancy', last: 'Drew'}
  // }
 
  // setValue() { this.form.setValue({first: 'Carson', last: 'Drew'}); }

}
