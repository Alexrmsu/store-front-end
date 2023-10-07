import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL : string = 'http://localhost:3000/user';


  constructor(
    private HTTP: HttpClient,
    public jwtHelper: JwtHelperService
  ) {
  }

  registerUser(user: object) : Observable<Object> {
    return this.HTTP.post<object>(this.URL + '/register', user);
  }

  loginUser(user: object) : Observable<Object> {
    return this.HTTP.post<object>(this.URL + '/login', user);
  }


  isLogged() : Boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }


}
