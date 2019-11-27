// import { ImmobileDettaglio } from './../../../../projects/broker-lib/src/lib/models/immobili/immobileDettaglio';
import { ImmobileDettaglio, LogErroriService, StoreService, AlertService } from 'broker-lib';
import { ImmobiliService, SessionService } from 'broker-lib';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/component/base.component';

@Component({
    selector: 'app-scheda-immobile',
    templateUrl: './scheda-immobile.page.html',
    styleUrls: ['./scheda-immobile.page.scss']
})
export class SchedaImmobilePage extends BaseComponent implements OnInit {

    public immobile_id: string;
    public immobile: ImmobileDettaglio;

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private immobiliService: ImmobiliService,
        public sessionService: SessionService,
        public logErroriService: LogErroriService,
        public storeService: StoreService,
        public alertService: AlertService
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
        if (cliente.id_cliente === 0 || cliente.id_cliente === undefined) {
            // non ho clienti selezionati
            this.presentAlert("E' necessario selezionare un cliente");
            this.goToPage('home');
        }
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
}
