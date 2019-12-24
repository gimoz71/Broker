import { LogErroriService } from '../../services/log-errori/log-errori.service';
import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { WsLogErrore } from '../../models/common/wslogerrore';
import { AlertService } from '../../services/common/alert.service';
import { SessionService } from '../../services/common/session.service';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

    constructor(
        private injector: Injector,
        private zone: NgZone,
        private logErroriService: LogErroriService,
        private alertService: AlertService,
        private sessionService: SessionService) { }

    handleError(error: Error | HttpErrorResponse) {
        const token = this.sessionService.getUserData().token_value;

        console.log('gestisco un errore');
        const errore = new WsLogErrore();
        errore.token = token;
        errore.log_stacktrace = JSON.stringify(error);
        errore.log_descrerr = error.message;
        errore.log_metodoerr = '';
        errore.log_link = '';
        errore.log_query = '';
        errore.username = '';
        // console.log('trasmetto l\'errore');
        this.logErroriService.postErrore(errore).subscribe(r => {
            console.log('errore trasmesso: ' + errore);
            this.alertService.presentErrorAlert('Errore ' + error.message + ' trasmesso al server');
        });
        console.log('gestione errore completata');
    }
}
