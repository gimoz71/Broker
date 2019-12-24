import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Http } from '../../models/common/http.namespace';
import { BrokerHttpService } from '../common/brokerhttp.service';
import { ConstantsService } from '../common/constants.service';
import { WsLogErrore } from '../../models/common/wslogerrore';
import { ErrorMessage } from '../../models/common/errormessage';

/**
 *
 *
 * @export
 * LogErroriService
 */
@Injectable()
export class LogErroriService {

    constructor(
        private httpService: BrokerHttpService,
        private constants: ConstantsService) { }

    /**
     * Chiamata per il salvataggio su persistenza di errori
     *
     * @param errorData
     * @param tokenValue
     * @returns
     * LogErroriService
     */
    public postErrore(errorData: WsLogErrore): Observable<Http.HttpResponse> {
        return this.httpService.post(this.constants.postErroreServiceName, errorData);
    }

    public generateErrorMessage(errorMessage: ErrorMessage): WsLogErrore {
        const logErrore: WsLogErrore = new WsLogErrore();

        logErrore.log_descrerr = errorMessage.msg_testo;
        logErrore.log_stacktrace = errorMessage.msg_techdata;

        return logErrore;
    }
}
