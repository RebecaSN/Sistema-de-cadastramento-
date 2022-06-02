import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutorizaçãoService {

  autorizacao = false

  constructor() { }

  autorizar(){
   localStorage.setItem('login',"sim")//quando o usuario fizer login, vou colocar lá no localstorage uma variavel com o valor de sim
  }
  deslogar(){
   localStorage.clear()//limpa o local starage quando deslogar
  }
  obterStatusLogin = ()=>!!localStorage.getItem('login')//os dois pontos de exclamações faz com que retorne true se existir ou false se n existir a variavel de login//função, busca no locla storage e traz se existe aquela variavel que é o logim

  
}
