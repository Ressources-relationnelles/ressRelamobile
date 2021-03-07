import { Component } from '@angular/core';
import{ModalController}from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public modalController:ModalController) {}

  showSubmenu: boolean = false;
  showSubmenu2: boolean = false;


menuItemHandler(): void {
  this.showSubmenu = !this.showSubmenu;
}
menuItemHandler2(): void {
  this.showSubmenu2 = !this.showSubmenu2;
}
}
