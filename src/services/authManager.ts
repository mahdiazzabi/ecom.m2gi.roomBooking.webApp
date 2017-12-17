import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot ,RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthManager implements CanActivate{

    constructor(private router: Router){
        
            }
        
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (window.sessionStorage.getItem('currentUser')) {
        return true ;
        }else{
            
             this.router.navigate(['/login']);
        }
    }

    
   
}