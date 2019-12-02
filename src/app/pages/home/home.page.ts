import { Component, OnInit } from '@angular/core';
import { ClientiService, SessionService, LogErroriService, StoreService, AlertService } from 'broker-lib';

import { Cliente, Immobile, WsToken } from 'broker-lib';

import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/base.component';
/// import { Cliente, Immobile, WsToken } from 'projects/broker-lib/src/public-api';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage extends BaseComponent implements OnInit {

    public clienti: Array<Cliente>;
    public clienteScelto: Cliente;
    public immobiliCliente: Array<Immobile>;
    public tempImmobiliCliente: Array<Immobile>;
    public pippo: Immobile;

    constructor(
        private clientiService: ClientiService,
        public sessionService: SessionService,
        public storeService: StoreService,
        public router: Router,
        public logErroriService: LogErroriService,
        public alertService: AlertService
    ) {
        super(sessionService, storeService, router, logErroriService, alertService);
        this.clienti = new Array<Cliente>();
        this.clienteScelto = new Cliente();
        this.immobiliCliente = new Array<Immobile>();
        this.tempImmobiliCliente = new Array<Immobile>();
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.initializeApp();
    }

    private initializeApp() {

        this.wsTokenObservable.subscribe(r => {
            if (r) {
                this.clientiService.getClienti(this.wsToken.token_value).subscribe(r => {
                    if (r.Success) {
                        console.log('RICEVUTO: ' + r.Data);
                        this.clienti = r.Data;
                    }
                });
            }
        });
    }

    public caricaCliente(cliente: Cliente) {
        this.clienteScelto = cliente;

        this.sessionService.setCliente(this.clienteScelto);
        this.sessionService.elencoImmobiliObs.subscribe(r => {
            if (r) {
                this.immobiliCliente = this.sessionService.immobiliCliente;
            }
        });
    }

    public apriSchedaImmobile(immobile: number) {
        // this.router.navigate(['scheda-immobile'], { queryParams: { immobile_id: immobile } });
        this.goToPageParams('scheda-immobile', { queryParams: { immobile_id: immobile } });
    }

    public goToWizard(): void {
        this.sessionService.clearImmobileDettaglio();
        this.goToPage('wizard');
    }

    public svuotaCache(): void {
        this.sessionService.clearUserData();
    }
}
