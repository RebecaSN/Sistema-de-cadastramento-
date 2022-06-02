import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../models/interface';

@Component({
  selector: 'app-funcionario-lista',
  templateUrl: './funcionario-lista.component.html',
  styleUrls: ['./funcionario-lista.component.css']
})
export class FuncionarioListaComponent implements OnInit {

  funcionario: Funcionario[]=[]
  columns: string[] = ['nome','email','cargo','salario','actions']
  carregando =false

  constructor(
    private funcService:FuncionarioService
  ) { }

  ngOnInit(): void {
    this.listarFuncionarios()
  }

  listarFuncionarios(){
   this.funcService.listarFuncionarios().subscribe(doc =>{  //para pegar os dados do firebase é diferente, já que n fica armazenado no dormato json, e sim como colection
     console.log(doc) //doc é uma variavel 
    this.funcionario=[]
    doc.forEach((element:any) => {//doc é o resultado que ta la no firebase
     this.funcionario.push({
       id:element.payload.doc.id,
       ...element.payload.doc.data()
     });
   })//payload:tira os metadados e tra só o essencial, vai pegar só o corpo do elemento 
   console.log(this.funcionario) 
  })
 }
  excluirFuncionario(id:string){//usar promise é uma questão do proprio firebase
  this.funcService.excluirFuncioario(id).then(()=>{
    console.log("Funcionario excluido")
  }, error=>{
    console.log("Erro ao excluir um funcionario" +error)
  })
  }

  editarFuncionario(funcionario:Funcionario){
   this.funcService.pegarDadosDoFuncionarioEscolhido(funcionario)
  }
}
