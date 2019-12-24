import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Http } from '../../models/common/http.namespace';
import { BrokerHttpService } from '../common/brokerhttp.service';
import { ConstantsService } from '../common/constants.service';
import { InserimentoClienteRequest } from '../../models/clienti/inserimentoClienteRequest';
import { AbilitaAppClienteRequest } from '../../models/clienti/abilitaAppClienteRequest';

/**
 * Classe che raduna tutti i servizi riconducibili all'entità cliente
 *
 * @export
 * ClientiService
 */
@Injectable()
export class ClientiService {

    constructor(
        private httpService: BrokerHttpService,
        private constants: ConstantsService) { }

    /**
     * Chiamata per ottenere l'elenco dei clienti completo.
     *
     * @param  tokenValue Token di autenticazione ottenuto dalla login
     * @returns contenente l'oggetto Data che a sua volta contiene l'elenco degli oggetti Cliente
     */
    public getClienti(): Observable<Http.HttpResponse> {
        return this.httpService.get(this.constants.getClientiServiceName);
    }

    /**
     * Chiamata per inserire un nuovo cliente
     *
     * @param  cliente
     * @param  tokenValue Token di autenticazione ottenuto dalla login
     * @returns response contenente l'esito in Success e ErrorMessages. Contenente l'oggetto 
     * Data dentro al quale si trova l'id dell'oggetto appena generato
     */
    public putCliente(cliente: InserimentoClienteRequest): Observable<Http.HttpResponse> {
        return this.httpService.post(this.constants.putClientiServiceName, cliente);
    }

    /**
     * Chiamata per abilitare l'app di uno specifico cliente
     *
     * @param  request oggetto contenente i parametri per l'abilitazione
     * @param  tokenValue Token di autenticazione ottenuto dalla login
     * @returns response contenente l'esito in Success e ErrorMessages.
     */
    public abilitaAppCliente(request: AbilitaAppClienteRequest): Observable<Http.HttpResponse> {
        return this.httpService.post(this.constants.abilitaAppClienteServiceName, request);
    }

    /**
     * Chiamata per ottenere il BookValue di un cliente
     *
     * @param  cliente_id identificativo unico del cliente del quale si vuole il BookValue
     * @param  tokenValue Token di autenticazione ottenuto dalla login
     * @returns response contenente l'esito in Success e ErrorMessages. Contenente l'oggetto 
     * Data che a sua volta contiene l'elenco degli oggetti BookValue
     */
    public getBookValue(cliente_id: number): Observable<Http.HttpResponse> {
        return this.httpService.get(this.constants.bookValueServiceName + this.constants.pathSeparator + cliente_id);
    }

    /**
     * Chiamata per ottenere il piano di ammortamento di un mutuo
     *
     * @param  mutuo_id identificativo unico del mutuo del quale si vuole il PianoAmmortamento
     * @param  tokenValue Token di autenticazione ottenuto dalla login
     * @returns response contenente l'esito in Success e ErrorMessages. Contenente l'oggetto 
     * Data che a sua volta contiene l'elenco degli oggetti PianoAmmortamento
     */
    public getPianoAmmortamento(mutuo_id: number): Observable<Http.HttpResponse> {
        return this.httpService.get(this.constants.pianoAmmortamentoServiceName + this.constants.pathSeparator + mutuo_id);
    }

}
