import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/auth.service";
import decode from 'jwt-decode';
import Swal from "sweetalert2";


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    public router: Router
  ) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const token: string | null = localStorage.getItem('token');


    // @ts-ignore
    const {rol} = decode(token);
    console.log(rol)

    if (rol !== expectedRole) {
      localStorage.clear()

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No tienes permisos para acceder aqui!',
      })

      this.router.navigate(['login']);
    }

    return true;
  }


}
