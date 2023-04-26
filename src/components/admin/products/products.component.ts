import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'price','delete'];
  dataSource = new MatTableDataSource<ProductsElement>;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;


  constructor(
    private productService: ProductService
  ) {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProducts().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<ProductsElement>(res.body);
      console.log(res.body)
    });
  }

  removeProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((res: any) => {
      console.log(res);
      this.getProduct();
    });
  }


}


export interface ProductsElement {
  id: number;
  name: string;
  description: string;
  price: string;
}




