import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RessourceService {

  constructor(private db : AngularFirestore, private auth : AuthService)
  {

  }

  createOrUpdateRessource(id = null, info) {
    if (id) {

    } else {
      info['creator'] = this.auth.currentUser.value.id;
      info['created_at'] = firebase.default.firestore.FieldValue.serverTimestamp();
      console.log('save :', info);

      return this.db.collection('ressources').add(info);
    }
  }

  getRessourceByUser()  {
    let id = this.auth.currentUser.value.id;
    return this.db.collection('ressources', ref => ref.where('creator', '==', id)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id,...(data as {}) };
      }))
    )
  }
}
