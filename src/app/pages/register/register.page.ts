import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm : FormGroup

  constructor(private fb: FormBuilder,
    private auth : AuthService,
    private alertCtrl : AlertController,
    private toastCtrl : ToastController,
    private router : Router,
    private loadingCtrl : LoadingController,) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]],
      nom : ['', [Validators.required]],
      prenom : ['',Validators.required],
      tel : ['',Validators.required],
    })
  }

  async register() {
    // Spinner de connexion
    let loading = await this.loadingCtrl.create({
      message : 'loading...'
    });

    this.auth.signUp(this.registerForm.value).then( async res => {
      loading.dismiss();
      let toast = await this.toastCtrl.create({
        duration:3000,
        message: 'Votre compte a bien été créé.'
      });
      toast.present();
      this.router.navigateByUrl('/co');
    }, async err => {
      let alert = await this.alertCtrl.create({
        header : 'Erreur',
        message: err.message,
        buttons: ['OK']
      });
      alert.present();
    });
    await loading.present();
  }

}
