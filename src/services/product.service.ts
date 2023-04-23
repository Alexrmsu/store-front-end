import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL = 'http://localhost:3000/product';

  constructor(
    private HTTP: HttpClient
  ) { }

  sendProduct(product:object) {
    return this.HTTP.post<object>(this.URL + '/add', product);
  }

}
