import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
  loginform = new FormGroup({
    username: new FormControl('', [
      Validators.minLength(5),
      Validators.required,
      // Validators
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [Validators.minLength(5), Validators.required]),
  }
  );

  get username(): any { return this.loginform.get('username'); }
  get email(): any { return this.loginform.get('email'); }
  get password(): any { return this.loginform.get('password'); }

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
  }


  register() {
    console.log(this.loginform.value);
    console.log(this.loginform.valid);
    this.registerService.addUser(this.loginform.value).subscribe(result => {
      // Handle result
      console.log(result);
      alert('register thành công');
    },
      error => {
        alert('register thất bại');
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
        //this.urlRouter.navigateByUrl('/book-management');
      });
  }
}
