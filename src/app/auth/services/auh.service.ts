import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map,catchError, tap} from 'rxjs/operators';
import { of, Observable } from 'rxjs';


import { environment } from '../../../environments/environment.prod';
import { authresponse, Usuario } from '../interfaces/interfaces-auth';

@Injectable({
  providedIn: 'root'
})
export class AuhService {


  private baseUrl:string = environment.baseURL;
  private _usuario!: Usuario;


  get usuario (){
    return {... this._usuario };
  }

  constructor(private http: HttpClient) {       

   }


   login(login: string, password: string){
     const url = `${this.baseUrl}/usuarios/login2`;     
     const body = {login:login, password: password}
    //console.log(url,'  bd ',body);
     return this.http.post<authresponse>(url ,  body)
      .pipe(
        tap(resp =>{
          if (resp.ok){
            localStorage.setItem('token',resp.token!);
            this._usuario={
              nombre: resp.nombre!,
              codusu: resp.codusu!,
              token: resp.token!
            }
            console.log('usu: ',this._usuario)
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.error.message))
      )
 
   }





   renovarToken():Observable<boolean> {
    
      const url = `${this.baseUrl}/usuarios/renew`;     

      var headers = new HttpHeaders().set('x-token',localStorage.getItem('token')|| '');
      // console.log('head',headers);
      return this.http.get<authresponse>(url, {headers})
        .pipe(
          map(resp =>{
            console.log(resp);
            localStorage.setItem('token',resp.token!);
            this._usuario={
              nombre: resp.nombre!,
              codusu: resp.codusu!,
              token: resp.token!
            }

            return resp.ok;
          }),
          catchError(err =>  of(false))
        )
    

   }

   
   logout(){
    localStorage.clear();

   }
}
