import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Http } from '../../models/common/http.namespace';
import { BrokerHttpService } from '../common/brokerhttp.service';
import { ConstantsService } from '../common/constants.service';

@Injectable()
export class ImmobiliService {

    constructor(
        private httpService: BrokerHttpService,
        private constants: ConstantsService) {}

    public getImmobili(idCliente: string, tokenValue: string): Observable<Http.HttpResponse> {
        return this.httpService.get(this.constants.getImmobiliServiceName, tokenValue);
        // return this.httpService.get('getimmobili' + '/' + idCliente, tokenValue);
    }
}
