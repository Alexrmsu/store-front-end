import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  logIn() {
    this.authService.loginUser(this.loginForm.value).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      if (res.status == 'Usuario o contraseña incorrectos') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario o contraseña incorrectos!',
        })
      } else {
        Swal.mixin({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: "Sesión Iniciada",
          allowEscapeKey: false,
          returnFocus: false,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: (toast: HTMLElement) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        }).fire();
        this.router.navigate(['/dashboard']);

      }

    });
  }
}
