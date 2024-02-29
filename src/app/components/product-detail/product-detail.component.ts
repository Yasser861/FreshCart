import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { ProductService } from './../../services/product.service';
import { product } from 'src/app/interfaces/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  isLoaded:boolean=true;
  productId:any='';
  item:any=''
  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductService:ProductService,private _CartService:CartService,private toastr: ToastrService){}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.productId = params.get('id');
      }
    })
    this._ProductService.getProductDetail(this.productId).subscribe({
      next:(response)=>{
        this.item=response.data;
        this.isLoaded=false;
      },
      error:(err)=>{
        console.log(err);
        this.isLoaded=false;
      }
    })
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
