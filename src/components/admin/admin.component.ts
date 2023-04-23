import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import Swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  productForm: FormGroup;
  products = [] as any;



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private http: HttpClient
  ) {
    this.productForm = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['' , Validators.required]

    })
  }

  ngOnInit() {
    this.http.get(`http://localhost:3000/product/all`).subscribe(
      (res: any) => {
        console.log(res)
        this.products = res;
      },
    )
  }


  sendProduct() {
    console.log(this.productForm.value);
    this.productForm.value.image = this.productForm.value.image.replace('C:\\fakepath\\', 'product\\')
    this.productService.sendProduct(this.productForm.value).subscribe((res:any) => {
      if (res.status == 'Product saved') {
        Swal.mixin({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: "Producto creado exitosamente",
          allowEscapeKey: false,
          returnFocus: false,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: (toast: HTMLElement) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        }).fire();

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Producto no creado!',
        })
      }

    });
  }



}
