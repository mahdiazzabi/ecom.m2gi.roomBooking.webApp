import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot ,RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthHoteManager implements CanActivate{

    constructor(private router: Router){
        
            }
        
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (window.sessionStorage.getItem('currentUser')) {
            if (JSON.parse(window.sessionStorage.getItem('currentUser')).isHote) {
            return true ;
            }else{
                return false ;
            }
        }else{
            
             this.router.navigate(['/login']);
        }

    }

    
   
}