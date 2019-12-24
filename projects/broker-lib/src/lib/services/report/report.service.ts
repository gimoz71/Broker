import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Http } from '../../models/common/http.namespace';
import { BrokerHttpService } from '../common/brokerhttp.service';
import { ConstantsService } from '../common/constants.service';

/**
 * Classe che raggruppa i servizi relativi ai Report
 *
 * @export
 * ReportService
 */
@Injectable()
export class ReportService {

    constructor(
        private httpService: BrokerHttpService,
        private constants: ConstantsService) { }

    /**
     * Chiamata per ottenere il report della situazione generale di un cliente
     *
     * @param cliente_id
     * @param tokenValue Token di autenticazione ottenuto dalla login
     * @returns
     */
    public getSituazioneGenerale(cliente_id: number): Observable<Http.HttpResponse> {
        return this.httpService.get(this.constants.situazioneGeneraleServiceName + this.constants.pathSeparator + cliente_id);
    }

    /**
     * Chiamata per ottenere i dati che vanno a popolare i grafici
     *
     * @param  cliente_id
     * @param  tokenValue Token di autenticazione ottenuto dalla login
     * @returns
     */
    public getGrafici(cliente_id: number): Observable<Http.HttpResponse> {
        return this.httpService.get(this.constants.graficiServiceName + this.constants.pathSeparator + cliente_id);
    }

    /**
     * Chiamata per scatenare l'invio del report generale in formato PDF al cliente passandolo in una mail
     *
     * @param  cliente_id
     * @param  tokenValue Token di autenticazione ottenuto dalla login
     * @returns
     */
    public getPdfReport(cliente_id: number): Observable<Http.HttpResponse> {
        return this.httpService.get(this.constants.pdfReportServiceName + this.constants.pathSeparator + cliente_id);
    }
}
