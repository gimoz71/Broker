// import { ImmobileDettaglio } from './../../../../projects/broker-lib/src/lib/models/immobili/immobileDettaglio';
import { ImmobileDettaglio, LogErroriService, StoreService, AlertService, CointestatarioDettaglio, Immobile } from 'broker-lib';
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
        public modalService: ModalService
    ) {
        super(sessionService, storeService, router, logErroriService, alertService);
        this.immobile_id = '';
        this.immobile = new ImmobileDettaglio();
    }

    public goToWizard(): void {
        this.goToPage("wizard");
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadCliente();
        var cliente = this.getCliente();
        if (cliente.cliente_id === 0 || cliente.cliente_id === undefined) {
            // non ho clienti selezionati
            this.presentAlert("E' necessario selezionare un cliente");
            this.goToPage('home');
        }
        this.immobiliCliente = this.sessionService.getImmobiliCliente();
        this.route.queryParams.subscribe(params => {

            this.immobile_id = params.immobile_id;
            this.immobiliService.getImmobile(this.immobile_id, this.sessionService.getUserData().token_value).subscribe(r => {
                if (r.Success) {

                    this.immobile = r.Data[0];
                    this.sessionService.setImmobileDettaglio(this.immobile);

                    // Calcolo il totale annuale delle tasse
                    // let totaleTasse = 0;
                    // this.immobile.tasse.forEach(t => {
                    //     totaleTasse += t.importo_annuale;
                    // });
                    // this.immobile.tasse_totale = totaleTasse;

                }
            });
        });
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
