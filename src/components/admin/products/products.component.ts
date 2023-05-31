import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ProductService} from "../../../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements AfterViewInit, OnInit {



  displayedColumns: string[] = ['id', 'name', 'description', 'image', 'price','delete'];
  dataSource = new MatTableDataSource<ProductsElement>;
  actualProduct: FormGroup | any;
  newP: FormGroup | any;
  closeResult = '';

  @ViewChild(MatPaginator) paginator: MatPaginator | any;


  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
    public fb: FormBuilder,
    private myPaginatorIntl: MatPaginatorIntl
  ) {
    this.myPaginatorIntl.itemsPerPageLabel = 'Productos por página:';

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

    this.actualProduct = this.fb.group({
      image: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      id: ['', Validators.required],
    })

    this.newP = this.fb.group({
      image: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      id: [0, Validators.required],
    })

  }


  addProduct() {
    this.newP.value.image = this.newP.value.image.replace('C:\\fakepath\\', "http://localhost:3000" + '/product/image/');
    this.productService.sendProduct(this.newP.value).subscribe((res: any) => {
      console.log(res);
      this.getProduct();
    });
    this.productService.uploadImage(this.newP.value.image).subscribe((res: any) => {
      console.log(res);
      this.getProduct();
    });

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

  updateProduct(id:number) {
    this.productService.updateProduct(this.actualProduct.value).subscribe((res: any) => {
      console.log(res);
      this.getProduct();
    });
  }


  openImage(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${ProductsComponent.getDismissReason(reason)}`;
    });
  }

  openAddProduct(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.getProduct();
    }, (reason) => {
      this.closeResult = `Dismissed ${ProductsComponent.getDismissReason(reason)}`;
    });
  }



  openEditProduct(content: any , item: any) {


    this.actualProduct.setValue({
      image: item.image,
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
  image: string;
}




