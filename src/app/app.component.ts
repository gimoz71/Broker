import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SessionService, StoreService, LogErroriService, AlertService, IconeService, WsToken } from 'broker-lib';

import { HomePage } from './pages/home/home.page';
import { BaseComponent } from './component/base.component';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public rootPage: any = HomePage;
  private unsubscribe$ = new Subject<void>();

  public wsToken: WsToken;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private sessionService: SessionService,
    private router: Router,
    private alertService: AlertService,
    private alertController: AlertController
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

    this.sessionService.userDataObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(present => {
      if (present) {
        this.wsToken = this.sessionService.getUserData();
      } else {
        this.alertService.presentAlert('Token assente, necessario login');
        this.router.navigate(['login']);
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
            this.sessionService.clearUserData();
            this.router.navigate(['login']);
          }
        }
      ]
    });
    alert.then((_alert: any) => {
      _alert.present();
    });
  }

  public isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  public getUtenteEmail(): string {
    if (this.wsToken !== undefined && this.wsToken !== null) {
      return this.wsToken.utente.email;
    } else {
      return 'email utente';
    }
  }

  public goToProfiloUtente(): void {
    this.router.navigate(['profilo-utente']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
