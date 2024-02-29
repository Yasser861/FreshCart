import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading:boolean=false;
  apiError:string='';
  constructor(private _AuthService:AuthService,private _Router:Router){}
  registerForm:FormGroup=new FormGroup(
    { name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]?).{8,}$/)]),
      rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]?).{8,}$/)]),
      phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}/)])
    },{validators:this.checkRepasswordMatch}
  )
  handleRegister(registerForm:FormGroup){
    if(registerForm.valid){
      this.isLoading=true;
      this._AuthService.signUp(registerForm.value).subscribe({
        next: (response)=>{
          this.isLoading=false;
          if(response.message==='success'){
            this._Router.navigate(['/login'])
          }
        },
        error:(err)=>{
          this.isLoading=false;  
          this.apiError=err.error.message;
          
        }
      })
    }
  }
  checkRepasswordMatch(dataform:any){
    if(dataform.get('password')?.value===dataform.get('rePassword')?.value){
      return null;
    }else{
      dataform.get('rePassword')?.setErrors({rePasswordMatch:`password doesn't match repassword`});
      return{rePasswordMatch:`password doesn't match repassword`};
    }
  }

}
