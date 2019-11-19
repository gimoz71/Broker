import { LogErroriService } from '../../services/log-errori/log-errori.service';
import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { WsLogErrore } from '../../models/common/wslogerrore';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

    constructor(
        private injector: Injector,
        private zone: NgZone,
        private logErroriService: LogErroriService) { }

    handleError(error: Error | HttpErrorResponse) {
        console.log('gestisco un errore');
        const errore = new WsLogErrore();
        errore.token = 'testtoken';
        errore.log_stacktrace = JSON.stringify(error);
        errore.log_descrerr = '';
        errore.log_metodoerr = '';
        errore.log_link = '';
        errore.log_query = '';
        errore.username = '';
        // console.log('trasmetto l\'errore');
        this.logErroriService.postErrore(errore, '').subscribe(r => {
            console.log('errore trasmesso');
        });
        console.log('gestione errore completata');
    }
}
