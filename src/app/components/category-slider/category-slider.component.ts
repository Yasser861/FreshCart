import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.css']
})
export class CategorySliderComponent implements OnInit{
  categoryList:any[]=[]
  constructor(private _ProductService:ProductService){}
  ngOnInit(): void {
    this._ProductService.getCategories().subscribe({
      next:(response)=>{
        this.categoryList=response.data;
      },
      error:(err)=>{
        console.log(err);
        
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
        items: 7
      },
    },
    nav: true
  }
}
