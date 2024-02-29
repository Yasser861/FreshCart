import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-checkout-session',
  templateUrl: './checkout-session.component.html',
  styleUrls: ['./checkout-session.component.css']
})
export class CheckoutSessionComponent {
  constructor(private _CartService:CartService,private _Router:Router){

  }
  orderForm=new FormGroup({
    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null)
  })
  navigateToPay(url:string){
    window.location.href=url;
  }
  checkOutVisa(orderForm:any){
    this._CartService.checkOutVisa(orderForm.value).subscribe({
      next:(response)=>{
        console.log(response.session.url);
        this.navigateToPay(response.session.url);
        // this._Router.navigate(response.session.url);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
