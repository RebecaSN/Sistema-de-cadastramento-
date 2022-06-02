import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargoListaComponent } from './components/cargo/cargo-lista/cargo-lista.component';
import { FuncionarioAdmComponent } from './components/funcionario/funcionario-adm/funcionario-adm.component';
import { FuncionarioCardsComponent } from './components/funcionario/funcionario-cards/funcionario-cards.component';
import { AutorizadoGuard } from './components/guards/autorizado.guard';
import { HomeComponent } from './components/templates/home/home.component';

const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },
    {
        path:"func-adm",
        component:FuncionarioAdmComponent,
        canActivate:[AutorizadoGuard]
    },
    {
        path:"card-func",
        component:FuncionarioCardsComponent
    },
    {
        path:"lista-cargo",
        component:CargoListaComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
