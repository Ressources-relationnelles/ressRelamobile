import { Component } from '@angular/core';
import{ModalController}from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public modalController:ModalController, private auth : AuthService) {}

  showSubmenu: boolean = false;
  showSubmenu2: boolean = false;


  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
  }
  menuItemHandler2(): void {
    this.showSubmenu2 = !this.showSubmenu2;
  }

  signOut() {
    this.auth.signOut();
  }
}
