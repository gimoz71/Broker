import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      // -- controllo se c'è un utente in storage
      // SE l'utente non c'è, mando al login
      // SE l'utente c'è
      // -- controllo se il token è ancora valido
      // SE è valido mando sulla HOME
      // SE non è valido refresh oppure login (sentire Massimiliano)
    });

  }
}
