import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Http } from '../../models/common/http.namespace';
import { BrokerHttpService } from '../common/brokerhttp.service';
import { ConstantsService } from '../common/constants.service';

@Injectable()
export class ClientiService {

    constructor(
        private httpService: BrokerHttpService,
        private constants: ConstantsService) {}

    public getClienti(tokenValue: string): Observable<Http.HttpResponse> {
        return this.httpService.get(this.constants.getClientiServiceName, tokenValue);
    }
}
