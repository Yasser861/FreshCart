import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { product } from 'src/app/interfaces/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoaded:boolean=true;
  productList:product[]=[];
  constructor(private _ProductService:ProductService){}
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

}
