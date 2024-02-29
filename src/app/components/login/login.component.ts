import { Component } from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService,private _Router:Router){

  }
  isLoading:boolean=false;
  apiError:string='';
  loginForm:FormGroup=new FormGroup(
    { email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]?).{8,}$/)])
    }
  )
  handleLogin(loginForm:FormGroup){
    if(this.loginForm.valid){
      this.isLoading=true;
      this._AuthService.signIn(loginForm.value).subscribe({
        next: (response)=>{
          localStorage.setItem('userToken',response.token);
          this._AuthService.decoded(); 
          this.isLoading=false;
          if(response.message==='success'){
            this._Router.navigate(['/home'])
          }
        },
        error:(err)=>{
          this.isLoading=false;  
          this.apiError=err.error.message;
        }
      })
    }
  }
}
