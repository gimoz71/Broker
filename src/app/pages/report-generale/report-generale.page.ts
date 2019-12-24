import { Component, OnInit } from '@angular/core';
import { SessionService, StoreService, LogErroriService, AlertService, ClientiService, LoginService, ReportService, Cliente, ReportGenerale, ReportGeneraleOggettoColonna, IconeService } from 'broker-lib';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/base.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-report-generale',
  templateUrl: './report-generale.page.html',
  styleUrls: ['./report-generale.page.scss'],
})
export class ReportGeneralePage extends BaseComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  public cliente: Cliente;
  public situazioneImmobili: Array<ReportGenerale>;

  public oggettiColonnaDestra: Array<ReportGeneraleOggettoColonna>;

  public etichettaColonna: string;

  constructor(public sessionService: SessionService,
    public storeService: StoreService,
    public router: Router,
    public logErroriService: LogErroriService,
    public alertService: AlertService,
    public clientiService: ClientiService,
    public loginService: LoginService,
    public reportService: ReportService,
    public iconeService: IconeService
  ) {
    super(sessionService, storeService, router, logErroriService, alertService, iconeService);
    this.situazioneImmobili = new Array<ReportGenerale>();
    this.oggettiColonnaDestra = new Array<ReportGeneraleOggettoColonna>();
    this.etichettaColonna = '';
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
        this.wsToken = this.sessionService.getUserData();

        const cliente_id = this.sessionService.getCliente().cliente_id;
        if (cliente_id === 0 || cliente_id === undefined) {
          // non ho clienti selezionati
          this.presentAlert("E' necessario selezionare un cliente");
          this.goToPage('home');
        }

        this.reportService.getSituazioneGenerale(cliente_id).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(r => {
          if (r.Success) {
            this.situazioneImmobili = r.Data.elenco_immobili;
          } else {
            this.manageError(r);
          }
        });
      } else {
        this.alertService.presentAlert('Token assente, necessario login');
        this.goToPage('login');
      }
    });
    this.sessionService.loadUserData();
  }

  public goToReportAnalisi(): void {
    this.goToPage('report-analisi');
  }

  private getTotalePassiviImmobile(immobile: ReportGenerale): number {
    let toReturn = 0;

    if (immobile.passivi) {
      for (const passivo of immobile.passivi) {
        const passivostring = passivo.importo_annuale;
        switch (passivostring) {
          case "null":
            break;
          case "":
            break;
          default:
            toReturn = toReturn + (+passivostring);
        }
      }
    }

    return toReturn;
  }

  private getTotaleAttiviImmobile(immobile: ReportGenerale): number {
    let toReturn = 0;

    if (immobile.attivo) {
      const attivostring = immobile.attivo.importo_mensile;
      switch (attivostring) {
        case "null":
          break;
        case "":
          break;
        default:
          toReturn = (+attivostring) * 12;
      }
    }

    return toReturn;
  }

  public getTotaleImmobile(immobile: ReportGenerale): number {
    return this.getTotaleAttiviImmobile(immobile) - this.getTotalePassiviImmobile(immobile);
  }

  public caricaPassiviImmobile(immobile: ReportGenerale): void {
    this.oggettiColonnaDestra = new Array<ReportGeneraleOggettoColonna>();
    this.etichettaColonna = 'Passivi';
    if (immobile.passivi) {
      for (const passivo of immobile.passivi) {
        const oggettoColonna = new ReportGeneraleOggettoColonna();
        oggettoColonna.descrizione = passivo.descrizione_passivo;
        oggettoColonna.valore = ((passivo.importo_annuale === "" || passivo.importo_annuale === "null") ? "0" : passivo.importo_annuale);
        this.oggettiColonnaDestra.push(oggettoColonna);
      }
    }
  }

  public caricaAttiviImmobile(immobile: ReportGenerale): void {
    this.oggettiColonnaDestra = new Array<ReportGeneraleOggettoColonna>();
    this.etichettaColonna = 'Attivi';
    if (immobile.attivo) {

      const oggettoColonnaDescrizioneAffittuario = new ReportGeneraleOggettoColonna();
      oggettoColonnaDescrizioneAffittuario.descrizione = 'Descrizione Affittuario';
      oggettoColonnaDescrizioneAffittuario.valore = immobile.attivo.descrizione_affittuario;

      const oggettoColonnaCedolareSecca = new ReportGeneraleOggettoColonna();
      oggettoColonnaCedolareSecca.descrizione = 'Cedolare Secca';
      oggettoColonnaCedolareSecca.valore = ((immobile.attivo.cedolare_secca === "" || immobile.attivo.cedolare_secca === "null") ? "0" : immobile.attivo.cedolare_secca);

      const oggettoColonnaAliquotaCedolare = new ReportGeneraleOggettoColonna();
      oggettoColonnaAliquotaCedolare.descrizione = 'Aliquota Cedolare';
      oggettoColonnaAliquotaCedolare.valore = ((immobile.attivo.aliquota_cedolare === "" || immobile.attivo.aliquota_cedolare === "null") ? "0" : immobile.attivo.aliquota_cedolare);

      const oggettoColonnaPrimaScadenzaAnni = new ReportGeneraleOggettoColonna();
      oggettoColonnaPrimaScadenzaAnni.descrizione = 'Prima Scadenza Anni';
      oggettoColonnaPrimaScadenzaAnni.valore = immobile.attivo.prima_scadenza_anni;

      const oggettoColonnaDataInizio = new ReportGeneraleOggettoColonna();
      oggettoColonnaDataInizio.descrizione = 'Data Inizio';
      oggettoColonnaDataInizio.valore = immobile.attivo.data_inizio;

      const oggettoColonnaImportoMensile = new ReportGeneraleOggettoColonna();
      oggettoColonnaImportoMensile.descrizione = 'Importo Mensile';
      oggettoColonnaImportoMensile.valore = ((immobile.attivo.importo_mensile === "" || immobile.attivo.importo_mensile === "null") ? "0" : immobile.attivo.importo_mensile);

      this.oggettiColonnaDestra.push(oggettoColonnaDescrizioneAffittuario);
      this.oggettiColonnaDestra.push(oggettoColonnaCedolareSecca);
      this.oggettiColonnaDestra.push(oggettoColonnaAliquotaCedolare);
      this.oggettiColonnaDestra.push(oggettoColonnaPrimaScadenzaAnni);
      this.oggettiColonnaDestra.push(oggettoColonnaDataInizio);
      this.oggettiColonnaDestra.push(oggettoColonnaImportoMensile);
    }
  }

  public getTotalePassiviImmobili(): number {
    let tot = 0;

    for (const immobile of this.situazioneImmobili) {
      tot = tot + this.getTotalePassiviImmobile(immobile);
    }
    return tot;
  }

  public getTotaleAttiviImmobili(): number {
    let tot = 0;

    for (const immobile of this.situazioneImmobili) {
      tot = tot + this.getTotaleAttiviImmobile(immobile);
    }
    return tot;
  }

  public getTotaleImmobili(): number {
    return this.getTotaleAttiviImmobili() - this.getTotalePassiviImmobili();
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
