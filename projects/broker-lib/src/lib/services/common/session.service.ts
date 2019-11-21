import { WsToken } from './../../models/login/wsToken';
import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { ImmobiliService } from '../immobili/immobili.service';

import { Cliente } from '../../models/clienti/cliente';
import { Immobile } from '../../models/immobili/immobile';
import { Subject } from 'rxjs';
import { DdlItem } from '../../models/common/ddlitem';

@Injectable()
export class SessionService {

    public cliente: Cliente;
    public immobiliCliente: Array<Immobile>;
    private elencoImmobiliSubject: Subject<boolean> = new Subject<boolean>();
    public elencoImmobiliObs = this.elencoImmobiliSubject.asObservable();
    private userData: WsToken;

    private tipologieTasse: Array<DdlItem> = [
        { id: 0, desc: "" },
        { id: 1, desc: "tasse1" },
        { id: 2, desc: "tasse2" },
        { id: 3, desc: "tasse3" },
    ];

    private tipiAffittuario: Array<DdlItem> = [
        { id: 0, desc: "" },
        { id: 1, desc: "tipoAffittuario1" },
        { id: 2, desc: "tipoAffittuario2" },
        { id: 3, desc: "tipoAffittuario3" },
    ];

    private euribor: Array<DdlItem> = [
        { id: 0, desc: "" },
        { id: 1, desc: "euribor1" },
        { id: 2, desc: "euribor2" },
        { id: 3, desc: "euribor3" },
    ];

    constructor(
        private storeService: StoreService,
        private immobiliService: ImmobiliService
    ) {
        this.userData = new WsToken();
    }

    public setCliente(cliente: Cliente): void {
        this.cliente = cliente;
        this.immobiliService.getImmobili(this.cliente.id_cliente + '', '').subscribe(r => {
            if (r.Success) {
                this.immobiliCliente = r.Data;
                // sveglia chi è in ascolto
                this.elencoImmobiliSubject.next(true);
            }
        });
    }

    public setUserData(userData: WsToken): number {
        this.userData = userData;
        if (userData != null) {
            this.storeService.setUserData(userData);
        } else {
            return -1;
        }
        return 1;
    }

    public getUserData(): WsToken {
        return this.userData;
    }

    public getTipologieTasse(): Array<DdlItem> {
        return this.tipologieTasse;
    }

    public getTipiAffittuari(): Array<DdlItem> {
        return this.tipiAffittuario;
    }

    public getEuribor(): Array<DdlItem> {
        return this.euribor;
    }

}
