import { Injectable } from '@angular/core';
import { BrokerHttpService } from '../common/brokerhttp.service';
import { ConstantsService } from '../common/constants.service';
import { Observable } from 'rxjs';
import { Http } from '../../models/common/http.namespace';
import { Cartella } from '../../models/documenti/cartella';
import { Documento } from '../../models/documenti/documento';

@Injectable()
export class DocumentiService {

    constructor(
        private httpService: BrokerHttpService,
        private constants: ConstantsService) {
    }

    public getCartelle(idcliente: number, idcartella: number): Observable<Http.HttpResponse> {
        return this.httpService.get(this.constants.getCartelle
            + this.constants.pathSeparator + idcliente
            + this.constants.pathSeparator + idcartella);
    }

    public getDocumento(iddocumento: number): Observable<Http.HttpResponse> {
        return this.httpService.get(this.constants.getDocumento
            + this.constants.pathSeparator + iddocumento);
    }

    public putCartelle(cartella: Cartella): Observable<Http.HttpResponse> {
        return this.httpService.post(this.constants.putCartelle, cartella);
    }

    public putDocumento(documento: Documento): Observable<Http.HttpResponse> {
        return this.httpService.post(this.constants.putDocumento, documento);
    }
}
