import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { take, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user : Observable<any>;
  currentUser = new BehaviorSubject(null);

  constructor(private afAuth : AngularFireAuth, private db: AngularFirestore, private router :Router) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        // console.log('auth changed: ', user);
        if (user) {
          return this.db.doc(`users/${user.uid}`).valueChanges().pipe(
            take(1),
            tap(data => {
              data['id'] = user.uid;
              this.currentUser.next(data);
            })
          );
        } else {
          this.currentUser.next(null);
          // used to create an observable
          return of(null);
        }
      })
    );
  }

  signUp(credentials) {
    return this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(data => {
      return this.db.doc(`users/${data.user.uid}`).set({
        nom: credentials.nom,
        prenom: credentials.prenom ,
        email: credentials.email ,
        tel: credentials.tel,
        role: 'USER',
        permissions: [],
        created: firebase.default.firestore.FieldValue.serverTimestamp()
      });
    });
  }

  signIn(credentials) : Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password)).pipe(
      switchMap( user => {
        if (user) {
          return this.db.doc(`users/${user.user.uid}`).valueChanges().pipe(
            take(1)
          );
        } else {
          // used to create an observable
          return of(null);
        }
      })
    )
  }

  signOut() {
    return this.afAuth.signOut().then( () => {
      this.router.navigateByUrl('/co');
    })
  }

  /**
   * Test si l'utilisateur a les permissions requises pour effectuer une action 
   * @param permissions Permissions
   * @returns boolean
   */
  hasPermissions(permissions : string[]) :boolean {
    if (!permissions) {
      return false;
    }
    for (const perm of permissions) {
      if (!this.currentUser.value || !this.currentUser.value.permissions.includes(perm)) {
        return false;
      }
    }
    return true;
  }

  // Réinitialisation de mot de passe, back gérer par Firebase
  resetPw(email :string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
