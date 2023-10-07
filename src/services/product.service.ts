import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as buffer from "buffer";
import {Observable} from "rxjs";
import {ProductsElement} from "../interfaces/product";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL: string = 'http://localhost:3000/product';

  constructor(
    private HTTP: HttpClient
  ) {
  }

  sendProduct(product: buffer.Buffer | ProductsElement[]): Observable<ProductsElement[]> {
    return this.HTTP.post<ProductsElement[]>(this.URL + '/add', product);
  }

  uploadImage(image: any): Observable<any> {
    return this.HTTP.post<any>(this.URL + '/upload', image);
  }

  getProducts(): Observable<Object> {
    return this.HTTP.get<object>(this.URL + '/all', {observe: 'response'});
  }

  deleteProduct(id: number): Observable<Object> {
    return this.HTTP.delete<object>(this.URL + '/delete/' + id);
  }

  updateProduct(product: any)  : Observable<ProductsElement[]>{
    return this.HTTP.put<ProductsElement[]>(this.URL + '/update', product);
  }

}
