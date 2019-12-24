import { ImmobileDettaglio, PianoAmmortamento, AnnoPianoAmmortamento, LogErroriService, StoreService, AlertService, IconeService, Immobile } from 'broker-lib';
import { ImmobiliService, SessionService } from 'broker-lib';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/component/base.component';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ammortamento',
  templateUrl: './ammortamento.page.html',
  styleUrls: ['./ammortamento.page.scss'],
})
export class AmmortamentoPage extends BaseComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  public pianoAmmortamento: Array<PianoAmmortamento>;
  public anniPianoAmmortamento: Array<AnnoPianoAmmortamento>;

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
    this.pianoAmmortamento = new Array<PianoAmmortamento>();
    this.anniPianoAmmortamento = new Array<AnnoPianoAmmortamento>();
    this.immobile = new ImmobileDettaglio();
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
    this.sessionService.userDataObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(present => {
      if (present) {
        this.route.queryParams.pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(params => {

          this.immobile.indirizzo = params.immobile_indirizzo;
          this.immobile.civico = params.immobile_civico;
          this.immobile.citta = params.immobile_citta;
          this.immobile.data_aggiornamento = params.immobile_data_aggiornamento;
          this.immobile.proprieta_id = params.immobile_id;
          this.immobile.codice_tipologia = params.immobile_codice_tipologia;

          this.immobiliService.getPianoAmmortamentoImmobile(params.immobile_id).pipe(
            takeUntil(this.unsubscribe$)
          ).subscribe(r => {
            if (r.Success) {
              this.pianoAmmortamento = r.Data.piano_ammortamento;
              this.organizzaPiano();
            } else {
              this.manageError(r);
            }
          });

          const cliente_id = this.sessionService.getCliente().cliente_id;
          if (cliente_id === 0 || cliente_id === undefined) {
            // non ho clienti selezionati
            this.presentAlert("E' necessario selezionare un cliente");
            this.goToPage('home');
          }
        });

      } else {
        this.alertService.presentAlert('Token assente, necessario login');
        this.goToPage('login');
      }
    });
    this.sessionService.loadUserData();
  }

  private organizzaPiano(): void {
    for (const piano of this.pianoAmmortamento) {
      if (!this.esisteAnno(piano.anno)) {
        const annoPiano = new AnnoPianoAmmortamento();
        annoPiano.anno = piano.anno;
        annoPiano.piano_lista = new Array<PianoAmmortamento>();
        this.anniPianoAmmortamento.push(annoPiano);
      }
      this.addPianoAdAnno(piano);
    }
  }

  private esisteAnno(anno: number): boolean {
    for (const annoPiano of this.anniPianoAmmortamento) {
      if (annoPiano.anno === anno) {
        return true;
      }
    }
    return false;
  }

  private addPianoAdAnno(piano: PianoAmmortamento): boolean {
    for (const annoPiano of this.anniPianoAmmortamento) {
      if (annoPiano.anno === piano.anno) {
        annoPiano.piano_lista.push(piano);
        return true;
      }
    }
    return false;
  }

  public getTotaleAnnoRate(annoPiano: AnnoPianoAmmortamento): number {
    let totale = 0;
    for (const piano of annoPiano.piano_lista) {
      totale = totale + piano.importo_rata;
    }
    return totale;
  }

  public getTotaleAnnoInteressi(annoPiano: AnnoPianoAmmortamento): number {
    let totale = 0;
    for (const piano of annoPiano.piano_lista) {
      totale = totale + piano.quota_interessi;
    }
    return totale;
  }

  public getTotaleAnnoCapitale(annoPiano: AnnoPianoAmmortamento): number {
    let totale = 0;
    for (const piano of annoPiano.piano_lista) {
      totale = totale + piano.quota_capitale;
    }
    return totale;
  }

  public getTotaleRate(): number {
    let totale = 0;
    for (const pianoAmm of this.pianoAmmortamento) {
      totale = totale + pianoAmm.importo_rata;
    }
    return totale;
  }

  public getTotaleInteressi(): number {
    let totale = 0;
    for (const pianoAmm of this.pianoAmmortamento) {
      totale = totale + pianoAmm.quota_interessi;
    }
    return totale;
  }

  public getTotaleCapitale(): number {
    let totale = 0;
    for (const pianoAmm of this.pianoAmmortamento) {
      totale = totale + pianoAmm.quota_capitale;
    }
    return totale;
  }

  public apriSchedaImmobile(immobile: number) {
    this.goToPageParams('scheda-immobile', { queryParams: { immobile_id: immobile } });
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
