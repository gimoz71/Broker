import { WsToken } from './../../models/login/wsToken';
import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { ImmobiliService } from '../immobili/immobili.service';

import { Cliente } from '../../models/clienti/cliente';
import { Immobile } from '../../models/immobili/immobile';
import { Subject } from 'rxjs';
import { ImmobileDettaglio } from '../../models/immobili/immobileDettaglio';
import { Connection } from '../../models/common/connection';

@Injectable()
export class SessionService {

    public cliente: Cliente;
    public immobiliCliente: Array<Immobile>;
    public immobile: ImmobileDettaglio = undefined;
    private elencoImmobiliSubject: Subject<boolean> = new Subject<boolean>();
    public elencoImmobiliObs = this.elencoImmobiliSubject.asObservable();
    private userData: WsToken;

    private connection: Connection;

    constructor(
        private storeService: StoreService,
        private immobiliService: ImmobiliService
    ) {
        this.userData = new WsToken();
        this.connection = new Connection();
    }

    public setCliente(cliente: Cliente): void {
        this.cliente = cliente;
        this.immobiliService.getImmobili(this.cliente.cliente_id + '', '').subscribe(r => {
            if (r.Success) {
                this.immobiliCliente = r.Data;
                // sveglia chi è in ascolto
                this.elencoImmobiliSubject.next(true);
            }
        });
    }

    public clearUserData(): void {
        this.storeService.clearUserData();
        this.userData = new WsToken();
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

    public setImmobileDettaglio(immobileDettaglio: ImmobileDettaglio): void {
        this.immobile = immobileDettaglio;
    }

    public getImmobileDettaglio(): ImmobileDettaglio {
        return this.immobile;
    }

    public clearImmobileDettaglio(): void {
        this.immobile = null;
    }

    public setConnection(conn: Connection): void {
        this.connection = conn;
    }

    public getConnection(): Connection {
        return this.connection;
    }
}
