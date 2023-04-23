import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as buffer from "buffer";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL = 'http://localhost:3000/product';

  constructor(
    private HTTP: HttpClient
  ) { }

  sendProduct(product: buffer.Buffer | object) {
    return this.HTTP.post<object>(this.URL + '/add', product);
  }

  uploadImage(image: any) {
    return this.HTTP.post<any>(this.URL + '/upload', image);
  }

}
