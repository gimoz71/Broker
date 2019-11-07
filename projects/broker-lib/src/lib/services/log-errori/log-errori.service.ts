import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Http } from '../../models/common/http.namespace';
import { BrokerHttpService } from '../common/brokerhttp.service';
import { ConstantsService } from '../common/constants.service';
import { Error } from '../../models/common/error.namespace';

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
        private constants: ConstantsService) {}

    /**
     * Chiamata per il salvataggio su persistenza di errori
     *
     * @param errorData
     * @param tokenValue
     * @returns
     * LogErroriService
     */
    public postErrore(errorData: Error.WsLogErrore, tokenValue: string): Observable<Http.HttpResponse> {
        return this.httpService.post(this.constants.postErroreServiceName, errorData, tokenValue);
    }
}
