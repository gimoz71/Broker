import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Http } from '../../models/common/http.namespace';
import { BrokerHttpService } from '../common/brokerhttp.service';
import { ConstantsService } from '../common/constants.service';

@Injectable()
export class DropdownService {

    constructor(
        private httpService: BrokerHttpService,
        private constants: ConstantsService) {}

    public getDropdown(Tipoddl: number, Filtro: string, Ordina: string, Componi: string, PrimoVuoto: string, PrimoTutti: string, tokenValue: string): Observable<Http.HttpResponse> {
        const path = '/' + Tipoddl + '/' + Filtro + '/' + Ordina + '/' + Componi + '/' + PrimoVuoto + '/' + PrimoTutti;
        return this.httpService.get(this.constants.getDropdownServiceName + path, tokenValue);
    }
}
