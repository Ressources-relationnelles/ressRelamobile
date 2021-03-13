import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { RessourcePage } from '../pages/ressource/ressource.page';
import { AuthService } from '../services/auth.service';
import { RessourceService } from '../services/ressource.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  ressources : Observable<any>;

  constructor(private auth : AuthService, private modalCtrl : ModalController, private ressourceService : RessourceService) { }

  ngOnInit() {
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

}

export class YourClass{

  LikeValue: number;
  DislikeValue: number;

    constructor(){
    this.LikeValue = 0;
    this.DislikeValue = 0;
    }

    handleLike(){
     this.LikeValue++;
    }
    handleDislike(){
     this.DislikeValue++;
    }
  }
