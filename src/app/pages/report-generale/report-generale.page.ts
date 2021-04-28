import { Component, OnInit, NgZone } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { SessionService, StoreService, LogErroriService, AlertService, ClientiService, LoginService, ReportService, Cliente, ReportGenerale, ReportGeneraleOggettoColonna, IconeService, ReportGeneralePassivo } from 'broker-lib';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/base.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';

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
    public logoutComm: LogoutCommunicationService,
    public currencyPipe: CurrencyPipe
  ) {
    super(sessionService, storeService, router, logErroriService, alertService, iconeService, ngZone);
    this.situazioneImmobili = new Array<ReportGenerale>();
    this.oggettiColonnaDestra = new Array<ReportGeneraleOggettoColonna>();
    this.etichettaColonna = '';
    this.attiviSelezionato = false;
    registerLocaleData(localeIt, 'it');
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

      this.oggettiColonnaDestra = new Array<ReportGeneraleOggettoColonna>();
  }

  private logout(): void {
    this.sessionService.clearUserData();
    this.logoutComm.comunicateLogout();
  }

  public goToReportAnalisi(): void {
    this.goToPage('report-analisi');
  }

  public getTotalePassiviImmobile(immobile: ReportGenerale): number {
    let toReturn = 0;

    if (immobile.passivi) {
      for (const passivo of immobile.passivi) {
        if (!passivo.descrizione_passivo.toLowerCase().includes('readvice'))
        {
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
    }

    return toReturn;
  }

  public getCRRImmobile(immobile: ReportGenerale): number {
    let toReturn = 0;

    if (immobile.passivi) {
      for (const passivo of immobile.passivi) {
        if (passivo.descrizione_passivo.toLowerCase().includes('readvice'))
        {
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
    }

    return toReturn;
  }

  public getTotaleAttiviImmobile(immobile: ReportGenerale): number {
    let toReturn = 0;

    if (immobile.attivo) {
      const totale: number = immobile.attivo.importo_mensile * 12;
      //const aliquota: number = totale / 100 * immobile.attivo.aliquota_cedolare;
      //toReturn = (totale - aliquota);
      toReturn = (totale);
    }
    if (immobile.detrazione_interessi_attivo != null) {
      toReturn += parseFloat(immobile.detrazione_interessi_attivo.importo_annuale.toFixed(2));
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

    var valore: number = 0;
    var push: boolean = true;
    if (oggetto.importo_annuale != null && oggetto.importo_annuale != "") {
      valore = parseFloat(oggetto.importo_annuale.toString().replace(",", "."));
    }
    if (oggetto.descrizione_passivo.toLowerCase() == "coefficiente readvice"){
      oggetto.descrizione_passivo = "Costo Ristrutturazione Readvice";
    }
    if (oggetto.descrizione_passivo.toLowerCase().includes('readvice')){
      push = false;
    }

    //console.log("Descrizione:" + oggetto.descrizione_passivo);
    //console.log("Valore:" + this.getCurrency(valore)); 

    if (this.colonnaDestraContieneOggetto(oggetto)) {
      for (const immobile of this.oggettiColonnaDestra) {
        if (immobile.descrizione === oggetto.descrizione_passivo) {
          immobile.valore = (parseFloat(immobile.valore) + valore).toString();

          //console.log("Totale:" + this.getCurrency(parseFloat(immobile.valore)));

        }
      }
    } else {

      if (push) {
        const oggettoColonna = new ReportGeneraleOggettoColonna();
        oggettoColonna.descrizione = oggetto.descrizione_passivo;
        oggettoColonna.valore = valore.toString();
        this.oggettiColonnaDestra.push(oggettoColonna);
      }
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

  public getCurrency(amount: number) {
    return this.currencyPipe.transform(amount, 'EUR', '', '1.2-2', 'it');
  }

  public getCurrencyExt(amount: number, title: string) {
    if (isNaN(amount)){
      return amount;
    }
    else{
      if (title.includes("Anni"))
      {
        return amount;
      }
    }
    return this.currencyPipe.transform(amount, 'EUR', '', '1.2-2', 'it');
  }

  public caricaAttiviImmobile(immobile: ReportGenerale): void {
    this.oggettiColonnaDestra = new Array<ReportGeneraleOggettoColonna>();
    this.attiviSelezionato = true;
    this.etichettaColonna = 'Attivi';
    if (immobile.detrazione_interessi_attivo != null) {

      const oggettoColonnaDetrazioneInteressi = new ReportGeneraleOggettoColonna();
      oggettoColonnaDetrazioneInteressi.descrizione = 'Detrazione interessi';
      oggettoColonnaDetrazioneInteressi.valore = immobile.detrazione_interessi_attivo.importo_annuale.toString();
      this.oggettiColonnaDestra.push(oggettoColonnaDetrazioneInteressi);
    }
    if (immobile.attivo) {

      if (immobile.attivo.descrizione_affittuario != "") {

        const oggettoColonnaDescrizioneAffittuario = new ReportGeneraleOggettoColonna();
        oggettoColonnaDescrizioneAffittuario.descrizione = 'Descrizione Affittuario';
        oggettoColonnaDescrizioneAffittuario.valore = immobile.attivo.descrizione_affittuario;
        this.oggettiColonnaDestra.push(oggettoColonnaDescrizioneAffittuario);

        const oggettoColonnaCedolareSecca = new ReportGeneraleOggettoColonna();
        oggettoColonnaCedolareSecca.descrizione = 'Cedolare Secca';
        oggettoColonnaCedolareSecca.valore = ((immobile.attivo.cedolare_secca === "" || immobile.attivo.cedolare_secca === "null") ? "NO" : (immobile.attivo.cedolare_secca.toUpperCase() === 'TRUE' ? 'SI' : 'NO'));
        this.oggettiColonnaDestra.push(oggettoColonnaCedolareSecca);

        if (immobile.attivo.cedolare_secca.toUpperCase() != 'TRUE') {
          const oggettoColonnaAliquotaCedolare = new ReportGeneraleOggettoColonna();
          oggettoColonnaAliquotaCedolare.descrizione = 'Aliquota';
          oggettoColonnaAliquotaCedolare.valore = ((immobile.attivo.aliquota_cedolare === null || immobile.attivo.aliquota_cedolare === undefined) ? '0' : immobile.attivo.aliquota_cedolare + '');
          this.oggettiColonnaDestra.push(oggettoColonnaAliquotaCedolare);
        }
        else{
           immobile.attivo.aliquota_cedolare = 21; //DA PRENDERE NEI PARAMETRI
        }

        const oggettoColonnaPrimaScadenzaAnni = new ReportGeneraleOggettoColonna();
        oggettoColonnaPrimaScadenzaAnni.descrizione = 'Prima Scadenza Anni';
        oggettoColonnaPrimaScadenzaAnni.valore = immobile.attivo.prima_scadenza_anni + '';
        this.oggettiColonnaDestra.push(oggettoColonnaPrimaScadenzaAnni);

        const oggettoColonnaDataInizio = new ReportGeneraleOggettoColonna();
        oggettoColonnaDataInizio.descrizione = 'Data Inizio';
        oggettoColonnaDataInizio.valore = new Date(+immobile.attivo.data_inizio).toLocaleDateString(); + ''; // formattare la data!!!
        this.oggettiColonnaDestra.push(oggettoColonnaDataInizio);

        if (immobile.attivo.importo_mensile === null || immobile.attivo.importo_mensile === undefined) {
          immobile.attivo.importo_mensile = 0;
        }
        var totale: number = immobile.attivo.importo_mensile * 12;
        var aliquota: number = totale / 100 * immobile.attivo.aliquota_cedolare;

        const oggettoColonnaImportoMensile = new ReportGeneraleOggettoColonna();
        oggettoColonnaImportoMensile.descrizione = 'Importo Mensile';
        oggettoColonnaImportoMensile.valore = (this.getCurrency(immobile.attivo.importo_mensile) + '') + ' €';
        this.oggettiColonnaDestra.push(oggettoColonnaImportoMensile);

        const oggettoColonnaImportoAnnuale = new ReportGeneraleOggettoColonna();
        oggettoColonnaImportoAnnuale.descrizione = 'Importo Annuale';
        oggettoColonnaImportoAnnuale.valore = (this.getCurrency(totale) + '') + ' €';
        this.oggettiColonnaDestra.push(oggettoColonnaImportoAnnuale);

        const oggettoColonnaImportoNetto = new ReportGeneraleOggettoColonna();
        oggettoColonnaImportoNetto.descrizione = 'Importo Netto';
        oggettoColonnaImportoNetto.valore = (this.getCurrency(totale - aliquota) + '') + ' €';
        this.oggettiColonnaDestra.push(oggettoColonnaImportoNetto);


      }


      if (immobile.detrazione_interessi_attivo != null) {
        const oggettoColonnaInteressi = new ReportGeneraleOggettoColonna();
        oggettoColonnaInteressi.descrizione = immobile.detrazione_interessi_attivo.descrizione;
        oggettoColonnaInteressi.valore = this.getCurrency(immobile.detrazione_interessi_attivo.importo_annuale) + ' €';
        this.oggettiColonnaDestra.push(oggettoColonnaInteressi);
      }

    }
  }

  public getTotalePassiviImmobili(): number {
    let tot = 0;

    for (const immobile of this.situazioneImmobili) {
      tot = tot + this.getTotalePassiviImmobile(immobile);
    }
    return tot;
  }

  public getCRRImmobili(): number {
    let tot = 0;

    for (const immobile of this.situazioneImmobili) {
      tot = tot + this.getCRRImmobile(immobile);
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
    this.reportService.getPdfReport(this.sessionService.getCliente().cliente_id).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
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
