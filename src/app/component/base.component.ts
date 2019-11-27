import { Component, OnInit } from '@angular/core';
import { WsToken, LogErroriService, ErrorMessage, Cliente, AlertService } from 'broker-lib';
import { StoreService, SessionService } from 'broker-lib';
import { Router } from '@angular/router';

@Component({
    selector: 'app-base',
    templateUrl: 'base.component.html',
    styleUrls: ['base.component.scss'],
})
export class BaseComponent implements OnInit {

    public wsToken: WsToken;
    public cliente: Cliente;

    constructor(
        public sessionService: SessionService,
        public storeService: StoreService,
        public router: Router,
        public logErroriService: LogErroriService,
        public alertService: AlertService) { }

    ngOnInit(): void {

        this.storeService.getUserDataPromise().then((val: WsToken) => {
            if (val == null) {
                this.router.navigate(['login']);
            } else {
                this.wsToken = val;
            }
        });
    }

    public loadCliente(): void {
        if (this.sessionService.cliente === undefined || this.sessionService.cliente == null) {
            this.cliente = new Cliente();
        } else {
            this.cliente = this.sessionService.cliente;
        }
    }

    public getCliente(): Cliente {
        return this.cliente;
    }

    public getUtenteEmail(): string {
        if (this.wsToken !== undefined) {
            return this.wsToken[0].utente.email;
        } else {
            return 'email utente';
        }
    }

    public getToken(): string {
        if (this.wsToken !== undefined) {
            return this.wsToken.token_value;
        } else {
            this.router.navigate(['login']);
            return '';
        }
    }

    public goToPage(pageName: string): void {
        this.router.navigate([pageName]);
    }

    public goToPageParams(pageName: string, params: any): void {
        this.router.navigate([pageName], params);
    }

    public logError(code: number, text: string): void {
        const errorMessage = new ErrorMessage();
        errorMessage.msg_testo = text;
        errorMessage.msg_code = code;
        errorMessage.msg_method = "";
        errorMessage.msg_techdata = "";
        errorMessage.msg_tipo = "";
        const message = this.logErroriService.generateErrorMessage(errorMessage);
        this.logErroriService.postErrore(message, this.wsToken.token_value);
    }

    public presentAlert(message: string): void {
        this.alertService.presentAlert(message);
    }

    public presentErrorAlert(message: string): void {
        this.alertService.presentErrorAlert(message);
    }
}
