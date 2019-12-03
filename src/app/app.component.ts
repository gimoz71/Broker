import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SessionService } from 'broker-lib';

import { HomePage } from './pages/home/home.page';
// import { AppConstantsService } from './services/costants/appcostants.service';
import { Connection } from 'projects/broker-lib/src/lib/models/common/connection';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public rootPage: any = HomePage;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private sessionService: SessionService
    // private appConstants: AppConstantsService
  ) {

  }

  ngOnInit(): void {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    // const connection: Connection = new Connection();
    // connection.url = this.appConstants.baseAppUrl;
    // connection.pathseparator = this.appConstants.pathSeparator;
    // connection.headertokenkey = this.appConstants.tokenHeaderKey;

    // this.sessionService.setConnection(connection);
  }
}
