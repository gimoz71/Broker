import { WsToken } from './../../models/login/wsToken';
import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { ImmobiliService } from '../immobili/immobili.service';

import { Cliente } from '../../models/clienti/cliente';
import { Immobile } from '../../models/immobili/immobile';
import { Subject } from 'rxjs';
import { ImmobileDettaglio } from '../../models/immobili/immobileDettaglio';
import { Connection } from '../../models/common/connection';
import { DatiCatastaliDettaglio } from '../../models/immobili/datiCatastaliDettaglio';
import { OmiDettaglio } from '../../models/immobili/omiDettaglio';
import { SpesaDettaglio } from '../../models/immobili/spesaDettaglio';
import { MutuoDettaglio } from '../../models/immobili/mutuoDettaglio';
import { AffittoDettaglio } from '../../models/immobili/affittoDettaglio';
import { TassaDettaglio } from '../../models/immobili/tassaDettaglio';
import { CointestatarioDettaglio } from '../../models/immobili/cointestatarioDettaglio';

@Injectable()
export class SessionService {

    public cliente: Cliente;
    public immobiliCliente: Array<Immobile>;
    public immobile: ImmobileDettaglio;
    private elencoImmobiliSubject: Subject<boolean> = new Subject<boolean>();
    public elencoImmobiliObs = this.elencoImmobiliSubject.asObservable();
    private userData: WsToken;

    private clientData: Cliente;

    private connection: Connection;

    private userDataSubject: Subject<boolean> = new Subject<boolean>();
    public userDataObservable = this.userDataSubject.asObservable();

    private intestazionePagina: string;
    private paginaPrecedente: string;

    constructor(
        private storeService: StoreService,
        private immobiliService: ImmobiliService
    ) {
        this.userData = new WsToken();
        this.clientData = new Cliente();
        this.connection = new Connection();
        this.cliente = new Cliente();
        this.immobiliCliente = new Array<Immobile>();
        this.immobile = new ImmobileDettaglio();
        this.immobile.dati_catastali = new DatiCatastaliDettaglio();
        this.immobile.spese = new Array<SpesaDettaglio>();
        this.immobile.omi = new OmiDettaglio();
        this.immobile.mutuo_dettaglio = new MutuoDettaglio();
        this.immobile.affitto_dettaglio = new AffittoDettaglio();
        this.immobile.tasse = new Array<TassaDettaglio>();
        this.immobile.cointestatari = new Array<CointestatarioDettaglio>();
        this.intestazionePagina = 'Readvice';
        this.paginaPrecedente = 'home';
    }

    public setPaginaPrecedente(pagina: string): void {
        this.paginaPrecedente = pagina;
    }

    public getPaginaPrecedente(): string {
        return this.paginaPrecedente;
    }

    public setIntestazionePagina(intestazione: string): void {
        this.intestazionePagina = intestazione;
    }

    public getIntestazionePagina(): string {
        return this.intestazionePagina;
    }

    public setCliente(cliente: Cliente): void {
        this.cliente = cliente;
        this.caricaImmobili(this.cliente.cliente_id + '');
    }

    public caricaImmobili(idCliente: string): void {
        this.immobiliService.getImmobili(idCliente).subscribe(r => {
            if (r.Success) {
                this.immobiliCliente = r.Data.elenco_immobili;
                console.log('caricati gli immobili del cliente: ' + this.immobiliCliente.length);
                // sveglia chi è in ascolto
                this.elencoImmobiliSubject.next(true);
            }
        });
    }

    public clearUserData(): void {
        this.storeService.clearUserData();
        this.cliente = new Cliente();
        this.userData = new WsToken();
    }

    public setUserData(userData: WsToken): number {
        this.userData = userData;
        if (userData != null) {
            this.storeService.setUserData(userData);
            if (userData.cliente !== undefined && userData.cliente !== null) {
                this.setCliente(userData.cliente);
            }
        } else {
            return -1;
        }
        return 1;
    }

    public setClientData(client: Cliente): number {
        this.clientData = client;
        if (client != null) {
            this.storeService.setClientData(client);
        } else {
            return -1;
        }
        return 1;
    }

    public getUserData(): WsToken {
        return this.userData;
    }

    public existsSessionData(): boolean {
        return (this.userData !== null && this.userData !== undefined && JSON.stringify(this.userData) !== '{}' && this.userData.token_value !== '');
    }

    public loadUserData(): void {
        if (this.userData !== null && this.userData !== undefined && JSON.stringify(this.userData) !== '{}' && this.userData.token_value !== '') {
            this.userDataSubject.next(true);
        } else {
            this.storeService.getUserDataPromise().then((val: WsToken) => {
                if (val == null) {
                    this.userDataSubject.next(false);
                } else {
                    this.userData = val;
                    this.userDataSubject.next(true);
                }
            });
        }
    }

    public getCliente(): Cliente {
        return this.cliente;
    }

    public clearCliente(): void {
        this.cliente = new Cliente();
        this.immobiliCliente = new Array<Immobile>();
    }

    public getImmobiliCliente(): Array<Immobile> {
        return this.immobiliCliente;
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
