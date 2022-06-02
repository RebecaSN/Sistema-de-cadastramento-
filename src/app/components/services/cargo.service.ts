import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

if (firebase.apps.length) {
  firebase.initializeApp({environment});
}

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(
    private fireAngular:AngularFirestore
  ) { }

  listarCargos():Observable<any>{
    return this.fireAngular.collection('cargo',ref =>ref.orderBy('cargo')).snapshotChanges()//esse ref é para dar uma referencia para trazer nossos cargos ordenados pelo nome
  }
}
