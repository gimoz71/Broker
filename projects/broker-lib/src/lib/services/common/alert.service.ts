import { Injectable } from '@angular/core';
import { Platform, MenuController, Nav, NavController, AlertController, ToastController } from 'ionic-angular';

@Injectable()
export class AlertService {

    constructor(private alertController: AlertController) {
    }

    public async presentAlert(alertMessage: string) {
        const alert = this.alertController.create({
            title: 'Conferma',
            message: alertMessage,
            buttons: ['OK']
        });
        alert.present();
    }

    public async presentErrorAlert(alertMessage: string) {
        const alert = this.alertController.create({
            title: 'Errore',
            message: alertMessage,
            buttons: ['CHIUDI']
        });
        alert.present();
    }
}
