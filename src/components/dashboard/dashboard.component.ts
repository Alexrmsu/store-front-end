import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showFiller = false;
  products: {} = {};

  show() {
    this.showFiller = !this.showFiller;
    console.log(this.showFiller)
  }

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit(){
    this.getProducts()
  }


  getProducts(){
    this.productService.getProducts().subscribe((res: {}) => {
      console.log(res);
      this.products = res;
    });
  }




}
