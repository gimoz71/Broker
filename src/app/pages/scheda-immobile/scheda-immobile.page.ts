// import { ImmobileDettaglio } from './../../../../projects/broker-lib/src/lib/models/immobili/immobileDettaglio';
import { ImmobileDettaglio, LogErroriService, StoreService, AlertService, CointestatarioDettaglio, Immobile, IconeService, MutuoDettaglio, AffittoDettaglio, TassaDettaglio, SpesaDettaglio, DatiCatastaliDettaglio, CancellazioneImmobileRequest } from 'broker-lib';
import { ImmobiliService, SessionService } from 'broker-lib';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { BaseComponent } from 'src/app/component/base.component';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';

@Component({
    selector: 'app-scheda-immobile',
    templateUrl: './scheda-immobile.page.html',
    styleUrls: ['./scheda-immobile.page.scss']
})
export class SchedaImmobilePage extends BaseComponent implements OnInit {

    private unsubscribe$ = new Subject<void>();

    public immobile_id: string;
    public immobile: ImmobileDettaglio;

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private immobiliService: ImmobiliService,
        public sessionService: SessionService,
        public logErroriService: LogErroriService,
        public storeService: StoreService,
        public alertService: AlertService,
        public modalService: ModalService,
        public iconeService: IconeService,
        public ngZone: NgZone,
        public alertController: AlertController,
        public logoutComm: LogoutCommunicationService
    ) {
        super(sessionService, storeService, router, logErroriService, alertService, iconeService, ngZone);
        this.resetImmobile();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ionViewDidEnter() {
        this.initializeApp();
        super.ngOnInit();

    }

    private resetImmobile(): void {
        this.immobile_id = '';
        this.immobile = new ImmobileDettaglio();
        this.immobile.mutuo_dettaglio = new MutuoDettaglio();
        this.immobile.affitto_dettaglio = new AffittoDettaglio();
        this.immobile.cointestatari = new Array<CointestatarioDettaglio>();
        this.immobile.tasse = new Array<TassaDettaglio>();
        this.immobile.spese = new Array<SpesaDettaglio>();
        this.immobile.dati_catastali = new DatiCatastaliDettaglio();
    }

    private initializeApp() {

        this.logoutComm.logoutObservable.pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(r => {
            this.ngZone.run(() => this.router.navigate(['login'])).then();
        });

        // ottengo il token
        this.sessionService.userDataObservable.pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(present => {
            if (present) {
                this.wsToken = this.sessionService.getUserData();

                if (this.sessionService.getImmobileDettaglio() !== null
                    && this.sessionService.getImmobileDettaglio().proprieta_id !== 0
                    && this.sessionService.getImmobileDettaglio().proprieta_id !== null
                    && this.sessionService.getImmobileDettaglio().proprieta_id !== undefined) {
                    this.immobile = this.sessionService.getImmobileDettaglio();
                    this.sessionService.setImmobileDettaglio(this.immobile);
                } else {
                    this.route.queryParams.pipe(
                        takeUntil(this.unsubscribe$)
                    ).subscribe(params => {

                        this.immobile_id = params.immobile_id;
                        this.loadImmobile(this.immobile_id);
                    });
                }
                const client_id = this.sessionService.getCliente().cliente_id;
                if (client_id === 0 || client_id === undefined) {
                    // non ho clienti selezionati
                    this.presentAlert("E' necessario selezionare un cliente");
                    this.goToPage('home');
                }

            } else {
                this.goToPage('login');
            }
        });
        this.sessionService.loadUserData();
    }

    private loadImmobile(id: string): void {
        this.immobiliService.getImmobile(id).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(s => {
            if (s.Success) {
                this.immobile = s.Data;
                this.sessionService.setImmobileDettaglio(this.immobile);
            }
        },
            (error) => {
                this.manageHttpError(error);
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



    public getTotaleTasse(immobile: ImmobileDettaglio): number {
        let tasse = 0;
        if (immobile && immobile.tasse) {
            for (const tassa of immobile.tasse) {
                tasse = tasse + tassa.importo_annuale;
            }
        }
        return tasse;
    }

    public apriPianoAmmortamento() {
        this.goToPageParams('ammortamento', {
            queryParams: {
                immobile_id: this.immobile.proprieta_id,
                immobile_indirizzo: this.immobile.indirizzo,
                immobile_civico: this.immobile.civico,
                immobile_citta: this.immobile.citta,
                immobile_data_aggiornamento: this.immobile.data_aggiornamento,
                immobile_codice_tipologia: this.immobile.codice_tipologia,
                immobile_mutuo_id: this.immobile.mutuo_dettaglio.proprieta_mutuo_id
            }
        });
    }

    public goToCatastali() {
        this.goToPage('catastali');
    }

    public deleteImmobile() {

        const alert = this.alertController.create({
            header: 'Cancellazione Immobile',
            message: 'Sicuro di voler eliminare questo immobile?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Si',
                    handler: () => {
                        const cancellazioneImmobileReq = new CancellazioneImmobileRequest();
                        cancellazioneImmobileReq.immobile_id = this.immobile.proprieta_id;
                        this.immobiliService.delImmobile(cancellazioneImmobileReq).pipe(
                            takeUntil(this.unsubscribe$)
                        ).subscribe(r => {
                            if (r.Success) {
                                this.alertService.presentAlert('Immobile cancellato con successo');
                                // dobbiamo ricaricare la lista degli immobili
                                this.sessionService.caricaImmobili(this.sessionService.getCliente().cliente_id + '');

                                this.goToHome();
                            } else {
                                this.manageError(r);
                            }
                        },
                            (error) => {
                                this.manageHttpError(error);
                            });
                    }
                }
            ]
        });
        alert.then((_alert: any) => {
            _alert.present();
        });
    }

    ionViewDidLeave() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.resetImmobile();
    }
}
