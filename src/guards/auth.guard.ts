import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import Swal from "sweetalert2";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(): boolean {

    if (!this.authService.isLogged()) {

      Swal.mixin({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: "Sesión Expirada",
        allowEscapeKey: false,
        returnFocus: false,
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: (toast: HTMLElement) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      }).fire();

      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
