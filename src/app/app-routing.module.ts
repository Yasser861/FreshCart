import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NoFoundComponent } from './components/no-found/no-found.component';
import { authGuard } from './auth.guard';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CheckoutSessionComponent } from './components/checkout-session/checkout-session.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',canActivate:[authGuard],component:HomeComponent,title:'Home'},
  {path:'brands',canActivate:[authGuard],component:BrandsComponent,title:'Brands'},
  {path:'cart',canActivate:[authGuard],component:CartComponent,title:'Cart'},
  {path:'categories',canActivate:[authGuard],component:CategoriesComponent,title:'Categories'},
  {path:'checkout-session',canActivate:[authGuard],component:CheckoutSessionComponent,title:'checkout-session'},
  {path:'products',canActivate:[authGuard],component:ProductsComponent,title:'Products'},
  {path:'productDetail/:id',canActivate:[authGuard],component:ProductDetailComponent},
  {path:'register',component:RegisterComponent,title:'Register'},
  {path:'login',component:LoginComponent,title:'Login'},
  {path:'**',component:NoFoundComponent,title:'Error'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
