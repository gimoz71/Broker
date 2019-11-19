import { ImmobileDettaglio } from './../../../../projects/broker-lib/src/lib/models/immobili/immobileDettaglio';
// import { ImmobileDettaglioVM } from './../../../../projects/broker-lib/src/lib/models/immobili/immobileDettaglioVM';
import { StoreService } from './../../../../projects/broker-lib/src/lib/services/store/store.service';
import { ImmobiliService, SessionService } from 'broker-lib';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-scheda-immobile',
    templateUrl: './scheda-immobile.page.html',
    styleUrls: ['./scheda-immobile.page.scss'],
})
export class SchedaImmobilePage implements OnInit {

    public immobile_id: string;
    public immobile: ImmobileDettaglio;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private immobiliService: ImmobiliService,
        private sessionService: SessionService,
    ) {
        this.immobile_id = '';
        this.immobile = new ImmobileDettaglio();
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {

            this.immobile_id = params.immobile_id;
            this.immobiliService.getImmobile(this.immobile_id, this.sessionService.getUserData().token_value).subscribe(r => {
                if (r.Success) {
                    this.immobile = r.Data; // Il webservice restituisce un oggetto di tipo Immobile (che è il DTO), ma valorizzo direttamente il ViewModel di tipo ImmobileVM perché è una classe derivata da Immobile
                    // const pippo = this.immobile.cointestatari.find(c => c.proprieta_possesso_id === this.sessionService.getUserData().utente.utente_id);
                    // console.log(pippo);

                }
            });



        });
    }

}
