import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoPageRoutingModule } from './co-routing.module';

import { CoPage } from './co.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CoPageRoutingModule
  ],
  declarations: [CoPage]
})
export class CoPageModule {}
