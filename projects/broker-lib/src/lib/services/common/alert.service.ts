import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
// import { Platform, MenuController, Nav, NavController, AlertController, ToastController } from 'ionic-angular';


@Injectable()
export class AlertService {

    constructor(private alertController: AlertController,
        private sessionService: SessionService,
        public router: Router) {
    }

    public async presentAlert(alertMessage: string) {
        const alert = this.alertController.create({
            header: 'Conferma',
            message: alertMessage,
            buttons: ['OK']
        });
        alert.then((_alert: any) => {
            _alert.present();
        });
    }

    public async presentErrorAlert(alertMessage: string) {
        const alert = this.alertController.create({
            header: 'Errore',
            message: alertMessage,
            buttons: ['CHIUDI']
        });
        alert.then((_alert: any) => {
            _alert.present();
        });
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

}
