import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuhService } from '../auth/services/auh.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
  
  constructor(private auth: AuhService,
              private router: Router
    ){};
  
  
  canActivate(): Observable<boolean> |boolean {
    console.log('activate');
    
    return this.auth.renovarToken()
    .pipe(
      tap(valid => {
        if (!valid){
            this.router.navigateByUrl('/auth')
        }
      } )
    );
  }
  canLoad(): Observable<boolean>  | boolean  {
    console.log('load');
      
    return this.auth.renovarToken()
    .pipe(
      tap(valid => {
        if (!valid){
            this.router.navigateByUrl('/auth')
        }
      } )
    );
  }
}
