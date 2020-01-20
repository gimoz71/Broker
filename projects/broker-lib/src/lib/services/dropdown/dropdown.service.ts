import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Http } from '../../models/common/http.namespace';
import { BrokerHttpService } from '../common/brokerhttp.service';
import { ConstantsService } from '../common/constants.service';
import { DdlItem } from '../../models/common/ddlitem';

@Injectable()
export class DropdownService {

    constructor(
        private httpService: BrokerHttpService,
        private constants: ConstantsService) { }

    public getTipologieTasse(primacasa: boolean, residente: boolean, affittata: boolean): Observable<Http.HttpResponse> {
        return this.getDropdown(this.constants.getDdlTasse,
            this.constants.pathSeparator + this.getBooleanAsString(primacasa)
            + this.constants.pathSeparator + this.getBooleanAsString(residente)
            + this.constants.pathSeparator + this.getBooleanAsString(affittata));
    }

    public getTipiAffittuari(): Observable<Http.HttpResponse> {
        return this.getDropdown(this.constants.getDdlAffittuari, '');
    }

    public getEuribor(): Observable<Http.HttpResponse> {
        return this.getDropdown(this.constants.getDdlEuribor, '');
    }

    public getTipiOmi(idComuneIstat: string): Observable<Http.HttpResponse> {
        return this.getDropdown(this.constants.getDdlOmi, this.constants.pathSeparator + idComuneIstat);
    }

    public getTipologieCatastali(): Observable<Http.HttpResponse> {
        return this.getDropdown(this.constants.getDdlTipologiaCatastale, '');
    }

    public getComuni(nomeComune: string): Observable<Http.HttpResponse> {
        return this.getDropdown(this.constants.getDdlComuni, this.constants.pathSeparator + nomeComune);
    }

    public getDropdown(Tipoddl: string, Filtro: string): Observable<Http.HttpResponse> {
        const path = Tipoddl + Filtro;
        return this.httpService.get(path);
    }

    private getBooleanAsString(input: boolean): string {
        return (input ? 'true' : 'false');
    }
}
