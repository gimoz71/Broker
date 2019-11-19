import { WsToken } from './../../models/login/wsToken';
import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { ImmobiliService } from '../immobili/immobili.service';

import { Cliente } from '../../models/clienti/cliente';
import { Immobile } from '../../models/immobili/immobile';
import { Subject } from 'rxjs';

@Injectable()
export class SessionService {

    public cliente: Cliente;
    public immobiliCliente: Array<Immobile>;
    private elencoImmobiliSubject: Subject<boolean> = new Subject<boolean>();
    public elencoImmobiliObs = this.elencoImmobiliSubject.asObservable();
    private userData: WsToken;

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

}
