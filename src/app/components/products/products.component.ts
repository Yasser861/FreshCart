import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from './../../services/product.service';
import { product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  isLoaded:boolean=true;
  productList:product[]=[];
  constructor(private _ProductService:ProductService, private _CartService:CartService,private toastr: ToastrService){}
  getAllProducts(){
   this._ProductService.getAllProducts().subscribe({
    next:(response)=>{
      this.productList=response.data.splice(0,20);
      this.isLoaded=false;
    },
    error:(err)=>{
      console.log(err);
      this.isLoaded=false;
    }
   });

  } 
  ngOnInit(): void {
    this.getAllProducts()
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }
  addToCart(productId:string){
    this._CartService.addToCart(productId).subscribe({
      next:(response)=>{
        console.log(response);
        this.toastr.success("Product added successfully to your cart",'',{
          progressBar:true,
          progressAnimation:'increasing',
          timeOut:2000
        });
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
