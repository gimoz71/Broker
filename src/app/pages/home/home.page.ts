import { Component, OnInit } from '@angular/core';
import { ClientiService, SessionService, LogErroriService, StoreService, AlertService, IconeService } from 'broker-lib';

import { Cliente, Immobile, WsToken } from 'broker-lib';

import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/base.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/// import { Cliente, Immobile, WsToken } from 'projects/broker-lib/src/public-api';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage extends BaseComponent implements OnInit {

    private unsubscribe$ = new Subject<void>();

    public clienti: Array<Cliente>;
    public pippo: Immobile;

    public searchName: string;
    public searchCF: string;

    constructor(
        private clientiService: ClientiService,
        public sessionService: SessionService,
        public storeService: StoreService,
        public router: Router,
        public logErroriService: LogErroriService,
        public alertService: AlertService,
        public iconeService: IconeService
    ) {
        super(sessionService, storeService, router, logErroriService, alertService, iconeService);
        this.clienti = new Array<Cliente>();
        this.searchName = '';
        this.searchCF = '';
    }

    ngOnInit(): void {
        super.ngOnInit();

    }

    ionViewDidEnter() {
        this.initializeApp();
    }

    private initializeApp() {

        this.sessionService.userDataObservable.subscribe(present => {
            if (present) {
                this.wsToken = this.sessionService.getUserData();
                this.clientiService.getClienti().pipe(
                    takeUntil(this.unsubscribe$)
                ).subscribe(t => {
                    if (t.Success) {
                        console.log('RICEVUTO: ' + t.Data);
                        this.clienti = t.Data.elenco_clienti;
                    } else {
                        this.manageError(t);
                    }
                });
            } else {
                this.alertService.presentAlert('Token assente, necessario login');
                this.goToPage('login');
            }
        });
        this.sessionService.loadUserData();

    }

    public caricaCliente(cliente: Cliente) {
        this.sessionService.setCliente(cliente);
    }

    public apriSchedaImmobile(immobile: number) {
        // this.router.navigate(['scheda-immobile'], { queryParams: { immobile_id: immobile } });
        this.goToPageParams('scheda-immobile', { queryParams: { immobile_id: immobile } });
    }

    public goToNuovoCliente(pulisci: boolean): void {
        if (pulisci) {
            this.sessionService.clearCliente();
        }
        this.goToPage('nuovo-cliente');
    }

    public goToPatrimonio(): void {
        this.goToPage('patrimonio');
    }

    public goToAnalisiGenerale(): void {
        this.goToPage('report-generale');
    }

    ionViewDidLeave() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
