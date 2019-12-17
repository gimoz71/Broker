import { Component, OnInit } from '@angular/core';
import { SessionService, StoreService, LogErroriService, AlertService, ClientiService, LoginService, ReportService, Cliente, ReportGenerale, ReportGeneraleOggettoColonna } from 'broker-lib';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/base.component';

@Component({
  selector: 'app-report-generale',
  templateUrl: './report-generale.page.html',
  styleUrls: ['./report-generale.page.scss'],
})
export class ReportGeneralePage extends BaseComponent implements OnInit {

  public cliente: Cliente;
  public situazioneImmobili: Array<ReportGenerale>;

  public oggettiColonnaDestra: Array<ReportGeneraleOggettoColonna>;

  constructor(public sessionService: SessionService,
    public storeService: StoreService,
    public router: Router,
    public logErroriService: LogErroriService,
    public alertService: AlertService,
    public clientiService: ClientiService,
    public loginService: LoginService,
    public reportService: ReportService
  ) {
    super(sessionService, storeService, router, logErroriService, alertService);
    this.cliente = new Cliente();
    this.situazioneImmobili = new Array<ReportGenerale>();
    this.oggettiColonnaDestra = new Array<ReportGeneraleOggettoColonna>();
  }

  ionViewDidEnter() {

    this.loadCliente();
    this.cliente = this.getCliente();
    if (this.cliente.cliente_id === 0 || this.cliente.cliente_id === undefined) {
      // non ho clienti selezionati
      this.presentAlert("E' necessario selezionare un cliente");
      this.goToPage('home');
    }
    this.reportService.getSituazioneGenerale(this.cliente.cliente_id, this.sessionService.getUserData().token_value).subscribe(r => {
      if (r.Success) {
        this.situazioneImmobili = r.Data.elenco_immobili;
      } else {
        this.manageError(r);
      }
    });
  }

  ngOnInit() {
    super.ngOnInit();
  }

  private goToReportAnalisi(): void {
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

  private getTotaleImmobile(immobile: ReportGenerale): number {
    return this.getTotaleAttiviImmobile(immobile) - this.getTotalePassiviImmobile(immobile);
  }

  private caricaPassiviImmobile(immobile: ReportGenerale): void {
    this.oggettiColonnaDestra = new Array<ReportGeneraleOggettoColonna>();
    if (immobile.passivi) {
      for (const passivo of immobile.passivi) {
        const oggettoColonna = new ReportGeneraleOggettoColonna();
        oggettoColonna.descrizione = passivo.descrizione_passivo;
        oggettoColonna.valore = ((passivo.importo_annuale === "" || passivo.importo_annuale === "null") ? "0" : passivo.importo_annuale);
        this.oggettiColonnaDestra.push(oggettoColonna);
      }
    }
  }

  private caricaAttiviImmobile(immobile: ReportGenerale): void {
    this.oggettiColonnaDestra = new Array<ReportGeneraleOggettoColonna>();
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
}
