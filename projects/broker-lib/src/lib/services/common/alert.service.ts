import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
// import { Platform, MenuController, Nav, NavController, AlertController, ToastController } from 'ionic-angular';


@Injectable()
export class AlertService {

    constructor(private alertController: AlertController) {
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
}
