import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { RessourceService } from 'src/app/services/ressource.service';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.page.html',
  styleUrls: ['./ressource.page.scss'],
})
export class RessourcePage implements OnInit {

  ressourceForm : FormGroup;
  id = null;
  user = "";

  constructor(
    private fb : FormBuilder,
    private modalCtrl : ModalController,
    private loadingCtrl : LoadingController,
    private ressourceService : RessourceService,
    private navParam : NavParams
  ) {}

  ngOnInit() {
    this.ressourceForm = this.fb.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      status: 0
    });

  this.id = this.navParam.get('id');

  if (this.id) {
    this.ressourceService.getRessource(this.id).subscribe( ressource => {
      console.log(ressource);
      this.ressourceForm.patchValue({
        title: ressource['title'],
        desc: ressource['desc'],
        status: ressource['status']
      });

      this.ressourceForm.controls['title'].disable();
      this.ressourceForm.controls['desc'].disable();
      // this.ressourceForm.controls['status'].disable();

      this.ressourceService.getUser(ressource['creator']).subscribe(user => {
        this.user = user['email'];
      })
    })
  }

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

  deleteRessource() {
    this.ressourceService.deleteRessource(this.id).then( () => {
      this.modalCtrl.dismiss();
    })
  }

}
