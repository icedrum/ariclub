import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {AuhService} from '../../auth/services/auh.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    ` * {margin: 15px } `
    
  ]
})
export class DashboardComponent  {

  get usuario(){
      console.log('Getter');
      return this.authservice.usuario;

  }

  constructor(private router: Router,
              private authservice: AuhService) { }


  logOut(){

      this.router.navigateByUrl('/auth/login');
      this.authservice.logout();
  }


}
