import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

    // Angular Firebase module
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { RessourcePageModule } from './pages/ressource/ressource.module';

// Possibilité de mettre la config firebase dans environments/environment.ts
// export const firebaseConfig = {
//   apiKey: "AIzaSyCxL9baMmWBmY-PWR1b3_wIAsAk7CuSVgo",
//   authDomain: "ressrela.firebaseapp.com",
//   projectId: "ressrela",
//   storageBucket: "ressrela.appspot.com",
//   messagingSenderId: "567851257901",
//   appId: "1:567851257901:web:13f7f21a3f86d208d1e8a4",
//   measurementId: "G-ZEYW7W2CGB"
// };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), AppRoutingModule,
    // Angular Firebase module
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    RessourcePageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
