import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
    selector: 'app-co',
    templateUrl: './co.page.html',
    styleUrls: ['./co.page.scss'],
})
export class CoPage implements OnInit {

  loginForm : FormGroup

  email : string = '';
  userId : string = '';
  method : string = '';

  constructor( public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router : Router
    )
  {
      this.afAuth.authState.subscribe(auth => {
          if ( !auth ) {
              console.log('non connecté');

          }else {
              console.log('connecté' );
              this.userId = auth.uid;
              this.email = auth.email;
              this.method = auth.providerData[0].providerId;
          }
      });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]]
    })
  }

  async login() {
    let loading = await this.loadingCtrl.create({
      message: 'Chargement...',
    });
    await loading.present();

    this.auth.signIn(this.loginForm.value).subscribe(
      user => {
        loading.dismiss();
        // console.log('user', user);
        let role = user['role'];
        // console.log('role user', role);

        if (role == 'USER') {
          this.router.navigateByUrl('/profil')
        } else if (role == 'ADMIN') {
          this.router.navigateByUrl('/admin')
        }

      },
      async err => {
        loading.dismiss();

        let alert = await this.alertCtrl.create({
          header: 'Error',
          message: err.message,
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }

  // Modal pour mot de passe oublié
  async openReset() {
    let inputAlert = await this.alertCtrl.create({
      header: 'Réinitialisation de mot de passe',

      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Réinitialiser',
          handler: data => {
            this.resetPw(data.email);
          }
        }
      ]
    });
    inputAlert.present();
  }

  resetPw(email) {
    this.auth.resetPw(email).then(
      async res => {
        let toast = await this.toastCtrl.create({
          duration: 3000,
          message: 'Un email vous a été envoyé ! Veuillez cliquer sur le lien présent dans le mail pour réinitialiser votre mot de passe.'
        });
        toast.present();
      },
      async err => {
        let alert = await this.alertCtrl.create({
          header: 'Error',
          message: err.message,
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }
}
