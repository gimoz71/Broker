import { Component, OnInit } from '@angular/core';
import { ClientiService, SessionService, LogErroriService, StoreService } from 'broker-lib';

import { Cliente, Immobile, WsToken } from 'broker-lib';

import { Router } from '@angular/router';
/// import { Cliente, Immobile, WsToken } from 'projects/broker-lib/src/public-api';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public wsToken: WsToken;

    public clienti: Array<Cliente>;
    public clienteScelto: Cliente;
    public immobiliCliente: Array<Immobile>;
    public tempImmobiliCliente: Array<Immobile>;
    public pippo: Immobile;

    constructor(
        private clientiService: ClientiService,
        private sessionService: SessionService,
        private storeService: StoreService,
        private router: Router
    ) {
        this.clienti = new Array<Cliente>();
        this.clienteScelto = new Cliente();
        this.immobiliCliente = new Array<Immobile>();
        this.tempImmobiliCliente = new Array<Immobile>();
    }

    ngOnInit(): void {

        this.storeService.getUserDataPromise().then((val: WsToken) => {
            if (val == null) {
                this.router.navigate(['login']);
                // this.navController.navigateRoot('home');
            } else {
                this.wsToken = val;
                this.initializeApp();
            }
        });

    }

    private initializeApp() {

        this.clientiService.getClienti('').subscribe(r => {
            if (r.Success) {
                console.log('RICEVUTO: ' + r.Data);
                this.clienti = r.Data;
            }
        });
    }

    public getUtenteEmail(): string {
        if (this.wsToken !== undefined) {
            return this.wsToken[0].utente.email;
        } else {
            return 'email utente';
        }
    }

    public caricaCliente(cliente: Cliente) {
        this.clienteScelto = cliente;

        this.sessionService.setCliente(this.clienteScelto);
        this.sessionService.elencoImmobiliObs.subscribe(r => {
            if (r) {
                this.immobiliCliente = this.sessionService.immobiliCliente;
            }
        });

        // this.immobiliCliente = new Array<Immobile>();

        // TEST COMUNICAZIONE POST
        // const errore = new Error.WsLogErrore();
        // errore.token = 'testtoken';
        // errore.log_stacktrace = '';
        // errore.log_descrerr = '';
        // errore.log_metodoerr = '';
        // errore.log_link = '';
        // errore.log_query = '';
        // errore.username = '';

        // console.log('trasmetto l\'errore');
        // this.logErroriService.postErrore(errore, '').subscribe(r => {
        //     console.log('errore trasmesso');
        // });

        // TEST GESTIONE ERRORE
        //  throw new TypeError('Ho generato un errore');

        // carico la lista degli immobili
        // this.immobiliService.getImmobili(this.clienteScelto.id_cliente + '', '').subscribe(r => {
        //     if (r.Success) {
        //         this.tempImmobiliCliente = r.Data;
        //         for (const imm of this.tempImmobiliCliente) {
        //             if (imm.id_cliente === this.clienteScelto.id_cliente) {
        //                 this.immobiliCliente.push(imm);
        //             }
        //         }
        //     }
        // });
    }

    public apriSchedaImmobile(immobile: number) {
        // console.log('immobile', immobile);
        // console.log('immobile_id', immobile.immobile_id);
        this.router.navigate(['scheda-immobile'], { queryParams: { immobile_id: immobile } });
    }


}
