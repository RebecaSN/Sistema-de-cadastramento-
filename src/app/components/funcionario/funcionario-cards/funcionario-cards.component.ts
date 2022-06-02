import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../models/interface';

@Component({
  selector: 'app-funcionario-cards',
  templateUrl: './funcionario-cards.component.html',
  styleUrls: ['./funcionario-cards.component.css']
})
export class FuncionarioCardsComponent implements OnInit {

  funcionario:Funcionario[]=[]
  constructor(
    private funcService: FuncionarioService
  ) { }

  ngOnInit(): void {
    this.mostrarFuncionarios()
  }

  mostrarFuncionarios(){

    this.funcService.listarFuncionarios().subscribe(doc =>{
     console.log(doc)
     this.funcionario = []
     doc.forEach((element:any) => {
       this.funcionario.push({
         id: element.payload.doc.id,
         ...element.payload.doc.data()})
       });
    })
    console.log(this.funcionario)
  }
}
