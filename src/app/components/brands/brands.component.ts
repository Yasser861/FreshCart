import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{
  isLoaded:boolean=true;
  brandsList:any=[]
  constructor(private _ProductService:ProductService){}
  ngOnInit(): void {
    this._ProductService.getBrands().subscribe({
      next:(response)=>{
        this.brandsList=response.data;
        this.isLoaded=false;
      },
      error:(err)=>{
        console.log(err);
        this.isLoaded=false;        
      }
    })
  }
}
