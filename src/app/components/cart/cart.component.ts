import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  numOfCartItems:number=0;
  products:any[]=[];
  totalCartPrice:number=0;
  constructor(private _CartService:CartService){}
  ngOnInit(): void {
    this._CartService.getLoggedCart().subscribe({
      next:(response)=>{
        console.log(response);
        this.numOfCartItems=response.numOfCartItems;
        this.products=response.data.products;
        this.totalCartPrice=response.data.totalCartPrice;
      }
    })
  }
  removeItem(id:string){
    this._CartService.RemoveItem(id).subscribe({
      next:(response)=>{
        console.log(response);
        this.numOfCartItems=response.numOfCartItems;
        this.products=response.data.products;
        this.totalCartPrice=response.data.totalCartPrice;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  updateCount(id:string,proCount:number){
    this._CartService.updateProQuantity(id,proCount).subscribe({
      next:(response)=>{
        console.log(response);
        this.numOfCartItems=response.numOfCartItems;
        this.products=response.data.products;
        this.totalCartPrice=response.data.totalCartPrice;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  clearCart(){
    this._CartService.clearCart().subscribe({
      next:(response)=>{
        console.log(response);
        this.numOfCartItems=0;
        this.products=[];
        this.totalCartPrice=0;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
