import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ProductService} from "../../../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'price','delete'];
  dataSource = new MatTableDataSource<ProductsElement>;
  actualTask: FormGroup | any;
  closeResult = '';

  @ViewChild(MatPaginator) paginator: MatPaginator | any;


  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
    public fb: FormBuilder
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

    this.actualTask = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      id: ['', Validators.required],
    })


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





  openEditProduct(content: any , item: any) {

    this.actualTask.setValue({
      name: item.name,
      description: item.description,
      price: item.price,
      id: item.id,
    })

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${ProductsComponent.getDismissReason(reason)}`;
    });
  }


  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return '';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return '';
    } else {
      return ``;
    }
  }




}


export interface ProductsElement {
  id: number;
  name: string;
  description: string;
  price: string;
}




