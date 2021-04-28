import { Component, OnInit, NgZone } from '@angular/core';
import { ClientiService, SessionService, LogErroriService, StoreService, AlertService, IconeService } from 'broker-lib';

import { Cliente, Immobile, WsToken } from 'broker-lib';

import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/base.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage extends BaseComponent implements OnInit {

    private unsubscribe$ = new Subject<void>();

    public clienti: Array<Cliente>;

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
        public logoutComm: LogoutCommunicationService,
        public currencyPipe: CurrencyPipe
    ) {
        super(sessionService, storeService, router, logErroriService, alertService, iconeService, ngZone);
        this.clienti = new Array<Cliente>();
        this.searchName = '';
        this.searchCF = '';
        registerLocaleData(localeIt, 'it');
    }

    public getCurrency(amount: number) {
        return this.currencyPipe.transform(amount, 'EUR', '', '1.2-2', 'it');
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
            this.unsubscribe$.next();
            this.unsubscribe$.complete();
            this.ngZone.run(() => this.router.navigate(['login'])).then();
        });

        if (this.sessionService.existsSessionData()) {
            this.wsToken = this.sessionService.getUserData();
            this.loadPageData();
        } else {
            this.sessionService.userDataObservable.pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(present => {
                if (present) {
                    this.wsToken = this.sessionService.getUserData();
                    this.loadPageData();
                } else {
                    this.logout();
                }
            });
            this.sessionService.loadUserData();
        }

    }

    private loadPageData(): void {
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
