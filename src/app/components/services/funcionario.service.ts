import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';//o banco de dados do firebase
import firebase from 'firebase/compat/app';//o firebase em si
import 'firebase/compat/storage'//importando o storage do firebase
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Funcionario } from '../funcionario/models/interface';

//o firebase deve ser inicializado de acordo com as especificações que estão dentro do enviroment
if (firebase.apps.length) {
  firebase.initializeApp({environment});
}

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private funcionarioEdit=new Subject<any>()//subject é um tipo especial de observable, ele permite enviar e receber dados,
  //vamos colocar do tipo subject pq nesse momento, quero que ao clicar no lapis, eu pegue os dados na tabela, dai vou pegar esses dados e preencher o formulario
  //depois vamos pegar esse mesmo subject e enviar, pegamos os dados então e expomos e ainda levamos la no banco de dados, ele vai e volta

  storageRef = firebase.app().storage().ref() //o caimho de onde essa foto vai estar armazenada 
  
  constructor(
    private fireAngular:AngularFirestore
  ) { }

  listarFuncionarios():Observable<any>{
    return this.fireAngular.collection('funcionario').snapshotChanges(); //vamos acessar a coleção do firestore que vamos trazer os dados que vamos utilizar, ja que o firebase n trabalha com tabelas, e s com collections//se as colections n existir lá ainda, ele cria para a gente
  }//funções assincronas, enviamos requisição, e fica esperando a responsta, mas n paramos a aplicação para esperar a resposta
  //n precisamos esperar a resposta para passar para outra etapa da nossa aplicação, enviamos e damos seguimento, isso é uma proxi (uma promessa),
  //como é uma promessa, ela n em certeza de ser enviada, pode ou não ser executado, ela pode ser um sicesos, ou ela pode dar erro. Um obsevable é uma evolição disso
  //no observable a gente pode mandar varios pedidos de uma vez só, significa que é uma requisição que pode ou n dar certo
 //funcionario é o nome da coletions que eu quero acessar ou crirar se n houver
 //snapshotChanges(): sempre que ouver alteração dos dados do funcionario, essas alterações é o snapshot, que é o responsavel em trazer essa alterações em tempo real
 addFuncionario(funcionario:Funcionario):Promise<any>{//n devemos colocar como observable, mas sim como uma promise, que é um tipo expecial de observable, devemos colocar aqui como promise para não permitir fazer varias rotinas dentro desse add funcionario, já que só podemos fazer o crud depois que esse funcionario ja tiver sido aiconado, na hora de adicionar só vai se fazer isso, nenhuma outra rotina
 return this.fireAngular.collection('funcionario').add(funcionario)
 }
 excluirFuncioario(id:string):Promise<any>{
  return this.fireAngular.collection("funcionario").doc(id).delete();
 }
 
 pegarDadosDoFuncionarioEscolhido(funcionario:Funcionario){
  this.funcionarioEdit.next(funcionario)//o next pega os dados da tabela do funcionario que escolhemos e coloca esse dados dentro do funcionario edit, e meio que fecha o subject, ele fica então pronto para poder ser enviado
 }

 getFuncionarioEdit():Observable<Funcionario>{
   return this.funcionarioEdit.asObservable()
 }//no funcionarioedit é o subject e ta armazenando os dados que queremos editar
  //como o subject é um tipo especial de observable, precisamos do 'as observable'  
 editarFuncionario(id:string, funcionario:Funcionario):Promise<any>{
   return this.fireAngular.collection('funcionario').doc(id).update(funcionario)
 }
 async subirImagem(nome:string, imgBase64:any){
    
 try{//precisamos esperar o processo de subir, e tudo ficar concluido:await
   let resultado = await this.storageRef.child("imgFoto/" + nome).putString (imgBase64, 'data_url')//e passamos como parametro os dados da url//sempre que queremos enviar um arquivo, precisamos transformar ele em uma variavel do tipo arquivo, que é o tipo blob//o putstring converte o arquivo que estamos enviando para um arquivo do tipo blob  //vou crirar uma pasta que vai ficar armazenada as fotos do funcionario//concatenando com o nome do arquivo que nos vamso dar a esse arquivo
   console.log(resultado)
   return await resultado.ref.getDownloadURL()//vai retornar a url para fazer o dowload do arquivo que estamos colocando no claudstorage
  }catch(error){
    console.log(error)
    return null
  }


 }//vai transoformar esse arquivo e vai colocar ele de base 64 para poder subir o arquivo//é uma função do tipo assincrona, e portanto utiliza o trycatch
 }//quando clocar o botão de editar, é chamada a funcão de pegardados do funcionario, e coloca dentro do nosso funcioanrio edit, que é o subject, agora eu preciso pegar os dados que estão dentro dentro do subject e colocar dentro do input do formulário
