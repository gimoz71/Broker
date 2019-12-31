import { Component, OnInit } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SessionService, StoreService, LogErroriService, AlertService, IconeService } from 'broker-lib';

import { HomePage } from './pages/home/home.page';
// import { AppConstantsService } from './services/costants/appcostants.service';
import { Connection } from 'projects/broker-lib/src/lib/models/common/connection';
import { BaseComponent } from './component/base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {

  public rootPage: any = HomePage;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public sessionService: SessionService,
    public storeService: StoreService,
    public router: Router,
    public logErroriService: LogErroriService,
    public alertService: AlertService,
    public iconeService: IconeService,
    public alertController: AlertController
    // private appConstants: AppConstantsService
  ) {
    super(sessionService, storeService, router, logErroriService, alertService, iconeService);
  }

  ngOnInit(): void {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.sessionService.userDataObservable.subscribe(present => {
      if (present) {
        this.wsToken = this.sessionService.getUserData();
      } else {
        this.alertService.presentAlert('Token assente, necessario login');
        this.goToPage('login');
      }
    });
    this.sessionService.loadUserData();
  }

  public logout() {
    this.presentAlertLogout();
  }

  public async presentAlertLogout() {
    const alert = this.alertController.create({
      header: 'Logout',
      message: 'Sicuro di voler uscire?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            // this.sessionService.clearUserData();
            this.router.navigate(['login']);
          }
        }
      ]
    });
    alert.then((_alert: any) => {
      _alert.present();
    });
  }
}
