import { Component, OnInit, NgZone } from '@angular/core';
import { ClientiService, SessionService, LogErroriService, StoreService, AlertService, IconeService } from 'broker-lib';

import { Cliente, Immobile, WsToken } from 'broker-lib';

import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/base.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';

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

    private caricaClienti: boolean;

    constructor(
        private clientiService: ClientiService,
        public sessionService: SessionService,
        public storeService: StoreService,
        public router: Router,
        public logErroriService: LogErroriService,
        public alertService: AlertService,
        public iconeService: IconeService,
        public ngZone: NgZone,
        public logoutComm: LogoutCommunicationService
    ) {
        super(sessionService, storeService, router, logErroriService, alertService, iconeService, ngZone);
        this.clienti = new Array<Cliente>();
        this.searchName = '';
        this.searchCF = '';
    }

    ngOnInit(): void {
        super.ngOnInit();

    }

    ionViewDidEnter() {
        this.caricaClienti = true;
        this.initializeApp();
    }

    private initializeApp() {

        this.logoutComm.logoutObservable.pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(r => {
            this.ngZone.run(() => this.router.navigate(['login'])).then();
        });

        this.sessionService.userDataObservable.subscribe(present => {
            if (present) {
                this.wsToken = this.sessionService.getUserData();
                if (this.caricaClienti) {
                    this.caricaClienti = false;
                    this.clientiService.getClienti().pipe(
                        takeUntil(this.unsubscribe$)
                    ).subscribe(t => {
                        if (t.Success) {
                            console.log('RICEVUTO: ' + t.Data);
                            this.clienti = t.Data.elenco_clienti;
                        } else {
                            this.manageError(t);
                        }
                    }, (error) => {
                        this.manageHttpError(error);
                        this.logout();
                    });
                }
            } else {
                this.logout();
            }
        });
        this.sessionService.loadUserData();

    }

    private logout(): void {
        this.sessionService.clearUserData();
        this.logoutComm.comunicateLogout();
    }

    public caricaCliente(cliente: Cliente) {
        this.sessionService.clearCliente();
        this.sessionService.setCliente(cliente);
        this.sessionService.setImmobileDettaglio(null);
    }

    public apriSchedaImmobile(immobile: number) {
        // this.router.navigate(['scheda-immobile'], { queryParams: { immobile_id: immobile } });
        this.sessionService.clearImmobileDettaglio();
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
