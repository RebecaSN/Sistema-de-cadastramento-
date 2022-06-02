import { Component, OnInit } from '@angular/core';
import { CargoService } from '../../services/cargo.service';
import { Cargo } from '../cargo';

@Component({
  selector: 'app-cargo-lista',
  templateUrl: './cargo-lista.component.html',
  styleUrls: ['./cargo-lista.component.css']
})
export class CargoListaComponent implements OnInit {

  cargos:Cargo[]=[]
  columns:string[] = ['cargo','descricao','salarioBase','actions']
  carregando=false

  constructor(
    private cargoService:CargoService,

  ) { }

  ngOnInit(): void {
    this.listarCargos()
  }

  listarCargos(){
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
