import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutorizaçãoService } from '../services/autorização.service';

@Injectable({
  providedIn: 'root'
})
export class AutorizadoGuard implements CanActivate {

  constructor(
    private autorizado:AutorizaçãoService,
    private router:Router
    ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const usuarioLogado = this.autorizado.obterStatusLogin()

    if (usuarioLogado) return usuarioLogado

    this.router.navigate(['/'])
      return true;
  }
  
}
