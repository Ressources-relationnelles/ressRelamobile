import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoPageRoutingModule } from './co-routing.module';

import { CoPage } from './co.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoPageRoutingModule
  ],
  declarations: [CoPage]
})
export class CoPageModule {}
