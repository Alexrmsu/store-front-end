import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showFiller: boolean = false;
  products: {} = {};

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit(): void{
    this.getProducts()
  }


  getProducts(): void{
    this.productService.getProducts().subscribe((res: {}) => {
      console.log(res);
      this.products = res;
    });
  }




}
