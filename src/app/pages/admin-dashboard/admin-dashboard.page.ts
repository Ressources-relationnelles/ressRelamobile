import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RessourceService } from 'src/app/services/ressource.service';
import { RessourcePage } from '../ressource/ressource.page';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  ressources : Observable<any>

  constructor(private auth: AuthService,
     private ressourceService: RessourceService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.ressources = this.ressourceService.getAdminRessources();
  }

  async openRessource(id) {
    const modal = await this.modalCtrl.create({
      component: RessourcePage,
      componentProps: {
        id
      }
    });
    await modal.present();
  }

  signOut() {
    this.auth.signOut();
  }

}
