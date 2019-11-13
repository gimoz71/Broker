import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Http } from '../../models/common/http.namespace';
import { BrokerHttpService } from '../common/brokerhttp.service';
import { ConstantsService } from '../common/constants.service';
import { ImmobileDettaglio } from '../../models/immobili/immobileDettaglio';
import { CancellazioneImmobileRequest } from '../../models/immobili/cancellazioneImmobileRequest';

/**
 * Classe che raduna tutti i servizi riconducibili all'entità immobile
 *
 * @export
 * ImmobiliService
 */
@Injectable()
export class ImmobiliService {

    constructor(
        private httpService: BrokerHttpService,
        private constants: ConstantsService) {}

    /**
     * Chiamata per ottenere l'elenco degli immobili appartenenti ad uno specifico cliente
     *
     * @param  id_cliente
     * @param  tokenValue Token di autenticazione ottenuto dalla login
     * @returns response contenente l'esito in Success e ErrorMessages. Contenente l'oggetto 
     * Data dentro al quale si trova l'elenco degli immobili
     */
    public getImmobili(id_cliente: string, tokenValue: string): Observable<Http.HttpResponse> {
        return this.httpService.get(this.constants.getImmobiliServiceName, tokenValue);
        // return this.httpService.get('getimmobili' + '/' + idCliente, tokenValue);
    }

    /**
     * Chiamata per ottenere il singolo immobile passando il suo identificativo unico
     *
     * @param  id_immobile
     * @param  tokenValue Token di autenticazione ottenuto dalla login
     * @returns response contenente l'esito in Success e ErrorMessages. Contenente l'oggetto 
     * Data dentro al quale si trova l'oggetto Immobile
     */
    public getImmobile(id_immobile: string, tokenValue: string): Observable<Http.HttpResponse> {
        return this.httpService.get(this.constants.getImmobileServiceName + this.constants.pathSeparator + id_immobile, tokenValue);
    }

    /**
     * Chiamata per inserire un nuovo immobile
     *
     * @param  immobile
     * @param  tokenValue Token di autenticazione ottenuto dalla login
     * @returns response contenente l'esito in Success e ErrorMessages. Contenente l'oggetto 
     * Data dentro al quale si trova l'id dell'immobile appena salvato
     */
    public putImmobile(immobile: ImmobileDettaglio, tokenValue: string): Observable<Http.HttpResponse> {
        return this.httpService.post(this.constants.putImmobileServiceName, immobile, tokenValue);
    }

    /**
     * Chiamata per cancellare un immobile passando il suo identificativo unico
     *
     * @param  cancellazioneRequest
     * @param  tokenValue Token di autenticazione ottenuto dalla login
     * @returns response contenente l'esito in Success e ErrorMessages.
     */
    public delImmobile(cancellazioneRequest: CancellazioneImmobileRequest, tokenValue: string): Observable<Http.HttpResponse> {
        return this.httpService.post(this.constants.delImmobileServiceName, cancellazioneRequest, tokenValue);
    }

    /**
     * Chiamata per attivare il flusso di invio dei dati catastali via mail all'utente proprietario dell'immobile di cui deve 
     * essere passato l'identificativo unico
     *
     * @param  immobile_id
     * @param  tokenValue Token di autenticazione ottenuto dalla login
     * @returns response contenente l'esito in Success e ErrorMessages.
     */
    public invioDatiCatastali(immobile_id: number, tokenValue: string): Observable<Http.HttpResponse> {
        return this.httpService.get(this.constants.getCatastoServiceName + this.constants.pathSeparator + immobile_id, tokenValue);
    }
}