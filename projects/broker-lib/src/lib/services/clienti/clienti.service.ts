import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Http } from '../../models/common/http.namespace';
import { BrokerHttpService } from '../common/brokerhttp.service';
import { ConstantsService } from '../common/constants.service';
import { InserimentoClienteRequest } from '../../models/clienti/inserimentoClienteRequest';
import { AbilitaAppClienteRequest } from '../../models/clienti/abilitaAppClienteRequest';
import { tokenName } from '@angular/compiler';

@Injectable()
export class ClientiService {

    constructor(
        private httpService: BrokerHttpService,
        private constants: ConstantsService) {}

    public getClienti(tokenValue: string): Observable<Http.HttpResponse> {
        return this.httpService.get(this.constants.getClientiServiceName, tokenValue);
    }

    public putCliente(cliente: InserimentoClienteRequest, tokenValue: string): Observable<Http.HttpResponse> {
        return this.httpService.post(this.constants.putClientiServiceName, cliente, tokenValue);
    }

    public abilitaAppCliente(request: AbilitaAppClienteRequest, tokenValue: string): Observable<Http.HttpResponse> {
        return this.httpService.post(this.constants.abilitaAppClienteServiceName, request, tokenValue);
    }

    public getBookValue(cliente_id: number, tokenValue: string): Observable<Http.HttpResponse> {
        return this.httpService.get(this.constants.bookValueServiceName + this.constants.pathSeparator + cliente_id, tokenValue);
    }
}
