import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RessourcePage } from '../pages/ressource/ressource.page';
import { AuthService } from '../services/auth.service';
import { RessourceService } from '../services/ressource.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  user;
  ressources : Observable<any>;
  constructor(private auth : AuthService, private modalCtrl : ModalController, private ressourceService : RessourceService, private db : AngularFirestore) { }

  ngOnInit() {
    let ide = this.auth.currentUser.value.id;
    console.log(ide);

    console.log(this.user);

    this.ressources = this.ressourceService.getRessourceByUser();
    console.log('ressources : ', this.ressourceService.getRessourceByUser());
  }

  async openRessourceModal() {
    const modal = await this.modalCtrl.create({
      component: RessourcePage
    });
    await modal.present();
  }

  signOut() {
    this.auth.signOut();
  }

  getUser(ide) {
    console.log("bonjour");

    this.user = this.db.doc(`users/${ide}`);
  }

}
