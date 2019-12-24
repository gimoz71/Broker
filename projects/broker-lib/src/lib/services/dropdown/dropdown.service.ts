import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Http } from '../../models/common/http.namespace';
import { BrokerHttpService } from '../common/brokerhttp.service';
import { ConstantsService } from '../common/constants.service';
import { DdlItem } from '../../models/common/ddlitem';

@Injectable()
export class DropdownService {

    private tipologieTasse: Array<DdlItem> = [
        { codice: 0, descrizione: "" },
        { codice: 1, descrizione: "tasse1" },
        { codice: 2, descrizione: "tasse2" },
        { codice: 3, descrizione: "tasse3" },
    ];

    private tipiAffittuario: Array<DdlItem> = [
        { codice: 0, descrizione: "" },
        { codice: 1, descrizione: "tipoAffittuario1" },
        { codice: 2, descrizione: "tipoAffittuario2" },
        { codice: 3, descrizione: "tipoAffittuario3" },
    ];

    private euribor: Array<DdlItem> = [
        { codice: 0, descrizione: "" },
        { codice: 1, descrizione: "euribor1" },
        { codice: 2, descrizione: "euribor2" },
        { codice: 3, descrizione: "euribor3" },
    ];

    private tipiOmi: Array<DdlItem> = [
        { codice: 0, descrizione: "" },
        { codice: 1, descrizione: "omi1" },
        { codice: 2, descrizione: "omi2" },
        { codice: 3, descrizione: "omi3" },
        { codice: 4, descrizione: "omi4" },
        { codice: 5, descrizione: "omi5" }
    ];

    constructor(
        private httpService: BrokerHttpService,
        private constants: ConstantsService) { }

    public getTipologieTasse(): Array<DdlItem> {
        return this.tipologieTasse;
    }

    public getTipiAffittuari(): Array<DdlItem> {
        return this.tipiAffittuario;
    }

    public getEuribor(): Array<DdlItem> {
        return this.euribor;
    }

    public getTipiOmi(idComuneIstat: string): Array<DdlItem> {
        return this.tipiOmi;
    }

    public getDropdown(Tipoddl: number, Filtro: string, Ordina: string, Componi: string, PrimoVuoto: string, PrimoTutti: string): Observable<Http.HttpResponse> {
        const path = '/' + Tipoddl + '/' + Filtro + '/' + Ordina + '/' + Componi + '/' + PrimoVuoto + '/' + PrimoTutti;
        return this.httpService.get(this.constants.getDropdownServiceName + path);
    }
}
