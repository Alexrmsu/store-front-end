import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginForm: FormGroup;

  // router



  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  // login function
  login() {
    console.log(this.loginForm.value);
    this.router.navigate(['/dashboard']).then(r => console.log(r));
  }



}
