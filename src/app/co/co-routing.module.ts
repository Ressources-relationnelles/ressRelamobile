import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoPage } from './co.page';

const routes: Routes = [
  {
    path: '',
    component: CoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoPageRoutingModule {}
