// import { ImmobileDettaglio } from './../../../../projects/broker-lib/src/lib/models/immobili/immobileDettaglio';
import { ImmobileDettaglio, LogErroriService, StoreService, AlertService, CointestatarioDettaglio, Immobile, IconeService } from 'broker-lib';
import { ImmobiliService, SessionService } from 'broker-lib';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/component/base.component';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
    selector: 'app-scheda-immobile',
    templateUrl: './scheda-immobile.page.html',
    styleUrls: ['./scheda-immobile.page.scss']
})
export class SchedaImmobilePage extends BaseComponent implements OnInit {

    public immobile_id: string;
    public immobile: ImmobileDettaglio;
    public immobiliCliente: Array<Immobile>;

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private immobiliService: ImmobiliService,
        public sessionService: SessionService,
        public logErroriService: LogErroriService,
        public storeService: StoreService,
        public alertService: AlertService,
        public modalService: ModalService,
        public iconeService: IconeService
    ) {
        super(sessionService, storeService, router, logErroriService, alertService, iconeService);
        this.immobile_id = '';
        this.immobile = new ImmobileDettaglio();
    }

    public goToWizard(): void {
        this.goToPage("wizard");
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ionViewDidEnter() {
        this.initializeApp();
        super.ngOnInit();

    }

    private initializeApp() {
        // ottengo il token
        this.sessionService.userDataObservable.subscribe(present => {
            if (present) {
                this.wsToken = this.sessionService.getUserData();
                this.route.queryParams.subscribe(params => {

                    this.immobile_id = params.immobile_id;
                    this.immobiliService.getImmobile(this.immobile_id, this.wsToken.token_value).subscribe(s => {
                        if (s.Success) {
                            this.immobile = s.Data;
                            this.sessionService.setImmobileDettaglio(this.immobile);
                        }
                    });
                });

                const cliente = this.getCliente();
                if (cliente.cliente_id === 0 || cliente.cliente_id === undefined) {
                    // non ho clienti selezionati
                    this.presentAlert("E' necessario selezionare un cliente");
                    this.goToPage('home');
                }
                this.immobiliCliente = this.sessionService.getImmobiliCliente();

            } else {
                this.alertService.presentAlert('Token assente, necessario login');
                this.goToPage('login');
            }
        });
        this.sessionService.loadUserData();




    }

    public getCointestatari(): Array<CointestatarioDettaglio> {
        if (this.immobile && this.immobile.cointestatari) {
            return this.immobile.cointestatari;
        } else {
            return new Array<CointestatarioDettaglio>();
        }
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    public apriSchedaImmobile(immobile: number) {
        // this.router.navigate(['scheda-immobile'], { queryParams: { immobile_id: immobile } });
        this.goToPageParams('scheda-immobile', { queryParams: { immobile_id: immobile } });
    }
}
