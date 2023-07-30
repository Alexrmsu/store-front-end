import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/user';


  constructor(
    private HTTP: HttpClient,
    public jwtHelper: JwtHelperService
  ) {
  }

  registerUser(user: object) {
    return this.HTTP.post<object>(this.URL + '/register', user);
  }

  loginUser(user: object) {
    return this.HTTP.post<object>(this.URL + '/login', user);
  }


  isLogged() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }


}
