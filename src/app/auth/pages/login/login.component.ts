import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuhService } from '../../services/auh.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {



  miFormulario: FormGroup = this.fb.group({
    login:    ['david@gmail.com', [ Validators.required, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
  });




  constructor(private fb: FormBuilder,private router: Router, private authservice: AuhService) { 
    
  }

  login(){

      //this.authservice.renovarToken().subscribe(console.log);
    

    

    const {login,password} = this.miFormulario.value;

    this.authservice.login(login,password)
    .subscribe( ok => {
      console.log('res: ',ok);
      if (ok===true)
        {
          this.router.navigateByUrl('/dashboard')
        } else {
          Swal.fire({
            title: 'Error!',
            text: ok,
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }
    
    })
    
  }

}
