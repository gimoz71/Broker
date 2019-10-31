import { Error } from './../../../../projects/broker-lib/src/lib/models/common/error.namespace';
import { LogErroriService } from 'broker-lib';
import { Component } from '@angular/core';
import { ImmobiliService } from 'broker-lib';
import { ClientiService } from 'broker-lib';
import { Platform } from 'ionic-angular';

import { Cliente } from 'broker-lib';
import { Immobile } from 'broker-lib';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    public clienti: Array<Cliente>;
    public clienteScelto: Cliente;
    public immobiliCliente: Array<Immobile>;
    public tempImmobiliCliente: Array<Immobile>;

    constructor(
        private immobiliService: ImmobiliService,
        private clientiService: ClientiService,
        private logErroriService: LogErroriService,
        public platform: Platform) {
        this.clienti = new Array<Cliente>();
        this.clienteScelto = new Cliente();
        this.immobiliCliente = new Array<Immobile>();
        this.tempImmobiliCliente = new Array<Immobile>();
        this.initializeApp();
        // this.platform.ready().then(() => {
        //   this.initializeApp();
        // });
    }

    private initializeApp() {
        this.clientiService.getClienti('').subscribe(r => {
            if (r.Success) {
                console.log('RICEVUTO: ' + r.Data);
                this.clienti = r.Data;
            }
        });
    }

    public caricaCliente(cliente: Cliente) {
        this.clienteScelto = cliente;

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
        throw new TypeError('Ho generato un errore');

        // carico la lista degli immobili
        this.immobiliService.getImmobili(this.clienteScelto.id_cliente + '', '').subscribe(r => {
            if (r.Success) {
                this.tempImmobiliCliente = r.Data;
                for (const imm of this.tempImmobiliCliente) {
                    if (imm.id_cliente === this.clienteScelto.id_cliente) {
                        this.immobiliCliente.push(imm);
                    }
                }
            }
        });
    }


}
