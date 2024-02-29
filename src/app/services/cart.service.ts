import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  header:any={
    token:localStorage.getItem('userToken')
  }
  constructor(private _HttpClient:HttpClient) { }
  addToCart(productId:string):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',
    {
      "productId": productId
    },
    {
      headers:this.header
    }
    )
  }
  getLoggedCart():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart',
    {
      headers:this.header
    }
    )
  }
  RemoveItem(id:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      headers:this.header
    }
    )
  }
  updateProQuantity(id:string,proCount:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      count:proCount
    },
    {
      headers:this.header
    }
    )
  }
  clearCart(){
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      headers:this.header
    }
    )
  }
  checkOutVisa(orderForm:any):Observable<any>
  {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/65d7935225e5a506b1d08909?url=http://localhost:4200`,
    {
      shippingAddress:orderForm
    },
    {
      headers:this.header
    }
    )
  }
}
