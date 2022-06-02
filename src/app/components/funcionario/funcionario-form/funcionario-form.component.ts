import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cargo } from '../../cargo/cargo';
import { CargoService } from '../../services/cargo.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../models/interface';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {

  funcionario:FormGroup =this.fb.group({
    nome:['', [Validators.required,Validators.minLength(3)]],
    email:['',[Validators.required,Validators.email]],
    cargo:['',[Validators.required]],
    salario:[''],
    foto:['']
  })

  id:string | undefined//para armazenar qual o id do funcionario que queremos editar, undefined ja que no momentos que ainda n escolhemos o objesto que vai ser editado, esse id ainda é indefinido
  urlImagem:any = ""
  cargos:Cargo[]=[]

  constructor(
   private fb:FormBuilder,
   private funcService:FuncionarioService,
   private cargoService:CargoService
  ) { }

  ngOnInit(): void {//serve para pegar os dados que estão detro do subject
    this.funcService.getFuncionarioEdit().subscribe(
      resultado =>{
      console.log(resultado)
      this.id = resultado.id//aqui vai vir os dados do funcionario que eu to querendo editar, e vai aparecer lá no input 
      this.urlImagem = resultado.foto
      this.funcionario.patchValue({
        nome:resultado.nome,
        email:resultado.email,
        cargo:resultado.cargo,
        salario:resultado.salario,
      })//serve para modificar os valores dentro dos atributos do funcionario, vamos colocar valores para os inputs vaziodo formGroup atraves desse path value
    })
    this.trazerTodosCargos()
  }
  salvarFuncionario(){
    if(this.id == undefined){//iso quer dizer que n clicamos no botão de editar, e portanto n tem um id lá no subject, e portanto ele vai servir para salvar um novo funcionario
    this.addFuncionario()
    }else{
     this.editarFuncionario(this.id)
    }
  }


  //caso tenha um id ele vai executar a função de editar, e assim saberemos se vamos executar a função de editar ou de cadastrar

  addFuncionario(){
    const FUNCIONARIO: Funcionario={
      nome:this.funcionario.value.nome,//pegando os valores que estão dentro do input
      email:this.funcionario.value.email,
      cargo:this.funcionario.value.cargo,
      salario:this.funcionario.value.salario,
      foto:this.urlImagem
    }
    this.funcService.addFuncionario(FUNCIONARIO).then(()=>{//then é equivalente ao subscribe 
      console.log("Funcionario cadastrado")
      this.funcionario.reset()//limpando as caixas de input
    },error=>{
      console.log("Erro ao cadastrar o funcioario")
    })
  }
  editarFuncionario(id:string){
    const FUNCIONARIO: Funcionario={
      nome:this.funcionario.value.nome,//pegando os novos valores que estão dentro do input
      email:this.funcionario.value.email,
      cargo:this.funcionario.value.cargo,
      salario:this.funcionario.value.salario,
      foto:this.urlImagem
    }
    this.funcService.editarFuncionario(id,FUNCIONARIO).then(()=>{
      console.log("Funcionario Editado com sucesso!")
      this.funcionario.reset//limpando os inputs
      this.id = undefined //voltando o id para undefined para sair o funcionario que editamos, caso n, ele sempre cairia nessa função
    },error=>{
      console.log("Erro ao editar o funcionario"+error)
    })

  }
  carregarImagem(event:any){//a hora que for feita alguma modificação naquele input do html, dentro do target vai ficar armazenado qual o arquivo escolhido ali
    let arquivo = event.target.files
    let reader = new FileReader() //passando para dentro dessa variavel, todos os metodos que a classe new reader traz   //arquivo que temos possibilidade de ler o arquivo que foi escolhido ali
    
    reader.readAsDataURL(arquivo[0])//só queremos um arquivo  ///vai ler o caminho do arquivo que nos escolhemos
    reader.onloadend = () =>{
      console.log(reader.result)//resultado dessa leitura, se ele entrou nessa função, ele ja terminou a leitura desse arquivo
     this.funcService.subirImagem("funcionario" +Date.now(), reader.result).then(urlImagem =>{
       console.log(urlImagem)//vamos imprimir o caminho da imagem
       this.urlImagem = urlImagem
      })//por ultimo no reader result, mando o arquivo em si//vai concatenar com a data e a hora com o momento em que foi feito o upload, para evitar arquivos com o mesmo nome//temos que passar o nome que vamos dar o arquivo
    }    //essa função de onloadend: só vai ser executado depois que foi feita toda a leitura do arquivo
  }

  trazerTodosCargos(){
      this.cargoService.listarCargos().subscribe(doc =>{
        this.cargos = []
        doc.forEach((element:any) =>{
         this.cargos.push({
           id:element.payload.doc.id,
           ...element.payload.doc.data()
         })
        })
      })
    

  }

}
