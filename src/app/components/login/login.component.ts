import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AutorizaçãoService } from '../services/autorização.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  usuarioEstaLogado = this.autorizacao.obterStatusLogin()

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private autorizacao: AutorizaçãoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }

  fazerLogin() { /* o método signInWithEmailAndPassword buscar no Firebase um usuário que contenha o mesmo email e senha para autorizar nosso acesso */
    this.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.senha).then(
      user => {
        console.log(user)
        this.autorizacao.autorizar()
        this.router.navigate(["/func-adm"])
      }
    )
    .catch(error =>{
      this.autorizacao.deslogar()
      this.router.navigate(['/'])
    })
  }
  fazerLogout(){
    this.autorizacao.deslogar()
    this.usuarioEstaLogado = this.autorizacao.obterStatusLogin()
  }

}
