import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  isLoaded:boolean=true;
  categoryList:any=[];
  constructor(private _ProductService:ProductService){}
  ngOnInit(): void {
    this._ProductService.getCategories().subscribe({
      next:(response)=>{
        this.categoryList=response.data;
        this.isLoaded=false;
      },
      error:(err)=>{
        console.log(err);
        this.isLoaded=false;
      }
    })
  }
}
