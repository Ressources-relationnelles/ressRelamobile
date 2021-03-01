import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { RessourceService } from 'src/app/services/ressource.service';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.page.html',
  styleUrls: ['./ressource.page.scss'],
})
export class RessourcePage implements OnInit {

  ressourceForm : FormGroup;
  id = null;

  constructor(
    private fb : FormBuilder,
    private modalCtrl : ModalController,
    private loadingCtrl : LoadingController,
    private ressourceService : RessourceService
  ) {}

  ngOnInit() {
    this.ressourceForm = this.fb.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      status: 0
    });
  }
  close() {
    this.modalCtrl.dismiss();
  }

  async saveOrUpdate() {
    let loading = await this.loadingCtrl.create({
      message: 'Chargement...'
    });
    await loading.present();

    this.ressourceService.createOrUpdateRessource(this.id, this.ressourceForm.value).then(() => {
      loading.dismiss();
      this.close();
    }, err => {
      loading.dismiss();
    })
  }

}
