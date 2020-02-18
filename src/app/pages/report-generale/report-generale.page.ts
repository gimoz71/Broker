import { Component, OnInit, NgZone } from '@angular/core';
import { SessionService, StoreService, LogErroriService, AlertService, ClientiService, LoginService, ReportService, Cliente, ReportGenerale, ReportGeneraleOggettoColonna, IconeService, ReportGeneralePassivo } from 'broker-lib';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/base.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';

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

  public attiviSelezionato: boolean;

  constructor(
    public sessionService: SessionService,
    public storeService: StoreService,
    public router: Router,
    public logErroriService: LogErroriService,
    public alertService: AlertService,
    public clientiService: ClientiService,
    public loginService: LoginService,
    public reportService: ReportService,
    public iconeService: IconeService,
    public ngZone: NgZone,
    public logoutComm: LogoutCommunicationService
  ) {
    super(sessionService, storeService, router, logErroriService, alertService, iconeService, ngZone);
    this.situazioneImmobili = new Array<ReportGenerale>();
    this.oggettiColonnaDestra = new Array<ReportGeneraleOggettoColonna>();
    this.etichettaColonna = '';
    this.attiviSelezionato = false;
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ionViewDidEnter() {
    this.initializeApp();
    super.ngOnInit();
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
        },
          (error) => {
            this.manageHttpError(error);
          });
      } else {
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
      toReturn = immobile.attivo.aliquota_cedolare + immobile.attivo.importo_mensile;
    }

    return toReturn;
  }

  public getTotaleImmobile(immobile: ReportGenerale): number {
    return this.getTotaleAttiviImmobile(immobile) - this.getTotalePassiviImmobile(immobile);
  }

  public caricaTotalePassivi(): void {
    this.oggettiColonnaDestra = new Array<ReportGeneraleOggettoColonna>();
    this.attiviSelezionato = false;
    this.etichettaColonna = 'Passivi Totali';
    for (const immobile of this.situazioneImmobili) {
      if (immobile.passivi) {
        for (const passivo of immobile.passivi) {
          this.addOggettoAColonnaDestra(this.oggettiColonnaDestra, passivo);
        }
      }
    }
  }

  private addOggettoAColonnaDestra(array: Array<ReportGeneraleOggettoColonna>, oggetto: ReportGeneralePassivo): void {

    if (this.colonnaDestraContieneOggetto(oggetto)) {
      for (const immobile of this.oggettiColonnaDestra) {
        if (immobile.descrizione === oggetto.descrizione_passivo) {
          immobile.valore = (+immobile.valore + +oggetto.importo_annuale) + '';
        }
      }
    } else {
      const oggettoColonna = new ReportGeneraleOggettoColonna();
      oggettoColonna.descrizione = oggetto.descrizione_passivo;
      oggettoColonna.valore = ((oggetto.importo_annuale === "" || oggetto.importo_annuale === "null") ? "0" : oggetto.importo_annuale);
      this.oggettiColonnaDestra.push(oggettoColonna);
    }
  }

  private colonnaDestraContieneOggetto(oggetto: ReportGeneralePassivo): boolean {
    for (const immobile of this.oggettiColonnaDestra) {
      if (immobile.descrizione === oggetto.descrizione_passivo) {
        return true;
      }
    }
    return false;
  }

  public caricaPassiviImmobile(immobile: ReportGenerale): void {
    this.oggettiColonnaDestra = new Array<ReportGeneraleOggettoColonna>();
    this.attiviSelezionato = false;
    this.etichettaColonna = 'Passivi';
    if (immobile.passivi) {
      for (const passivo of immobile.passivi) {
        this.addOggettoAColonnaDestra(this.oggettiColonnaDestra, passivo);
      }
    }
  }

  public caricaAttiviImmobile(immobile: ReportGenerale): void {
    this.oggettiColonnaDestra = new Array<ReportGeneraleOggettoColonna>();
    this.attiviSelezionato = true;
    this.etichettaColonna = 'Attivi';
    if (immobile.attivo) {

      const oggettoColonnaDescrizioneAffittuario = new ReportGeneraleOggettoColonna();
      oggettoColonnaDescrizioneAffittuario.descrizione = 'Descrizione Affittuario';
      oggettoColonnaDescrizioneAffittuario.valore = immobile.attivo.descrizione_affittuario;
      this.oggettiColonnaDestra.push(oggettoColonnaDescrizioneAffittuario);

      const oggettoColonnaCedolareSecca = new ReportGeneraleOggettoColonna();
      oggettoColonnaCedolareSecca.descrizione = 'Cedolare Secca';
      oggettoColonnaCedolareSecca.valore = ((immobile.attivo.cedolare_secca === "" || immobile.attivo.cedolare_secca === "null") ? "NO" : (immobile.attivo.cedolare_secca.toUpperCase() === 'TRUE' ? 'SI' : 'NO'));
      this.oggettiColonnaDestra.push(oggettoColonnaCedolareSecca);

      if (immobile.attivo.cedolare_secca.toUpperCase() === 'TRUE') {
        const oggettoColonnaAliquotaCedolare = new ReportGeneraleOggettoColonna();
        oggettoColonnaAliquotaCedolare.descrizione = 'Aliquota Cedolare';
        oggettoColonnaAliquotaCedolare.valore = ((immobile.attivo.aliquota_cedolare === null || immobile.attivo.aliquota_cedolare === undefined) ? '0' : immobile.attivo.aliquota_cedolare + '');
        this.oggettiColonnaDestra.push(oggettoColonnaAliquotaCedolare);
      }

      const oggettoColonnaPrimaScadenzaAnni = new ReportGeneraleOggettoColonna();
      oggettoColonnaPrimaScadenzaAnni.descrizione = 'Prima Scadenza Anni';
      oggettoColonnaPrimaScadenzaAnni.valore = immobile.attivo.prima_scadenza_anni + '';
      this.oggettiColonnaDestra.push(oggettoColonnaPrimaScadenzaAnni);

      const oggettoColonnaDataInizio = new ReportGeneraleOggettoColonna();
      oggettoColonnaDataInizio.descrizione = 'Data Inizio';
      oggettoColonnaDataInizio.valore = immobile.attivo.data_inizio + ''; // formattare la data!!!
      this.oggettiColonnaDestra.push(oggettoColonnaDataInizio);

      const oggettoColonnaImportoMensile = new ReportGeneraleOggettoColonna();
      oggettoColonnaImportoMensile.descrizione = 'Importo Mensile';
      oggettoColonnaImportoMensile.valore = ((immobile.attivo.importo_mensile === null || immobile.attivo.importo_mensile === undefined) ? '0' : immobile.attivo.importo_mensile + '') + '€';
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

  public generatePdfReport(): void {
    this.reportService.getPdfReport(this.sessionService.getCliente().cliente_id).subscribe(r => {
      if (r.Success) {
        this.alertService.presentAlert('Riepilogo PDF inviato correttamente');
      } else {
        this.manageError(r);
      }
    },
      (error) => {
        this.manageHttpError(error);
      });
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
