import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Http } from '../../models/common/http.namespace';
import { BrokerHttpService } from '../common/brokerhttp.service';
import { ConstantsService } from '../common/constants.service';
import { DdlItem } from '../../models/common/ddlitem';

@Injectable()
export class DropdownService {

    // private tipologieTasse: Array<DdlItem> = [
    //     { codice: 0, descrizione: "" },
    //     { codice: 1, descrizione: "tasse1" },
    //     { codice: 2, descrizione: "tasse2" },
    //     { codice: 3, descrizione: "tasse3" },
    // ];

    // private tipiAffittuario: Array<DdlItem> = [
    //     { codice: 0, descrizione: "" },
    //     { codice: 1, descrizione: "tipoAffittuario1" },
    //     { codice: 2, descrizione: "tipoAffittuario2" },
    //     { codice: 3, descrizione: "tipoAffittuario3" },
    // ];

    // private euribor: Array<DdlItem> = [
    //     { codice: 0, descrizione: "" },
    //     { codice: 1, descrizione: "euribor1" },
    //     { codice: 2, descrizione: "euribor2" },
    //     { codice: 3, descrizione: "euribor3" },
    // ];

    // private tipiOmi: Array<DdlItem> = [
    //     { codice: 0, descrizione: "" },
    //     { codice: 1, descrizione: "omi1" },
    //     { codice: 2, descrizione: "omi2" },
    //     { codice: 3, descrizione: "omi3" },
    //     { codice: 4, descrizione: "omi4" },
    //     { codice: 5, descrizione: "omi5" }
    // ];

    constructor(
        private httpService: BrokerHttpService,
        private constants: ConstantsService) { }

    public getTipologieTasse(primacasa: boolean, residente: boolean, affittata: boolean): Observable<Http.HttpResponse> {
        return this.getDropdown(this.constants.getDdlAffittuari,
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

    public getDropdown(Tipoddl: string, Filtro: string): Observable<Http.HttpResponse> {
        const path = this.constants.pathSeparator + Tipoddl + Filtro;
        return this.httpService.get(path);
    }

    private getBooleanAsString(input: boolean): string {
        return (input ? 'true' : 'false');
    }
}
