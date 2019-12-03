import { Component, OnInit } from '@angular/core';
import { StoreService, ImmobileDettaglio, ImmobiliService, AlertService, LogErroriService, WsLogErrore, CointestatarioDettaglio, TassaDettaglio, SpesaDettaglio, AffittoDettaglio, MutuoDettaglio, DatiCatastaliDettaglio, OmiDettaglio, DdlItem, SessionService, DropdownService } from 'broker-lib';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/base.component';
import { RaDatePipe } from 'src/app/pipes/date.pipe';


@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.page.html',
  styleUrls: ['./wizard.page.scss'],
})
export class WizardPage extends BaseComponent implements OnInit {

  public immobile: ImmobileDettaglio;

  public immobileTassoFisso: boolean;
  public immobileTassoVariabile: boolean;

  public wizardStart: boolean;
  public wizardDestinazione: boolean;
  public wizardDatiDestinazione: boolean;
  public wizardDati: boolean;
  public wizardCatastali: boolean;
  public wizardCointestatari: boolean;
  public wizardTassazione: boolean;

  // ddl di tutto il wizard
  public tipologieTasse: Array<DdlItem>;
  public tipiAffittuario: Array<DdlItem>;
  public euribor: Array<DdlItem>;
  public tipiOmi: Array<DdlItem>;

  public tassaSelezionata: TassaDettaglio;
  public cointestatarioSelezionato: CointestatarioDettaglio;

  public primacasa: boolean;
  public residente: boolean;
  public affittata: boolean;

  public headP1: string;
  public headP2: string;

  public dataInizioMutuo: Date = new Date();

  constructor(
    private immobiliService: ImmobiliService,
    public router: Router,
    public alertService: AlertService,
    public logErroriService: LogErroriService,
    public sessionService: SessionService,
    private dropdownService: DropdownService,
    public storeService: StoreService,
    public datePipe: RaDatePipe
  ) {

    super(sessionService, storeService, router, logErroriService, alertService);

    const immobileInSessione = this.sessionService.getImmobileDettaglio();
    if (immobileInSessione !== undefined && immobileInSessione !== null) {
      this.immobile = immobileInSessione;
      this.dataInizioMutuo = new Date(+this.immobile.mutuo_dettaglio.data_inizio);
    } else {
      this.immobile = new ImmobileDettaglio();
      const cointestatari: Array<CointestatarioDettaglio> = new Array<CointestatarioDettaglio>();
      this.immobile.cointestatari = cointestatari;
      const tasse: Array<TassaDettaglio> = new Array<TassaDettaglio>();
      this.immobile.tasse = tasse;
      const spese: Array<SpesaDettaglio> = new Array<SpesaDettaglio>();
      this.immobile.spese = spese;
      const affitto: AffittoDettaglio = new AffittoDettaglio();
      this.immobile.affitto_dettaglio = affitto;
      const mutuo: MutuoDettaglio = new MutuoDettaglio();
      this.immobile.mutuo_dettaglio = mutuo;
      const datiCatastali: DatiCatastaliDettaglio = new DatiCatastaliDettaglio();
      this.immobile.dati_catastali = datiCatastali;
      const omi: OmiDettaglio = new OmiDettaglio();
      this.immobile.omi = omi;

    }

    this.immobileTassoFisso = true;
    this.immobileTassoVariabile = true;

    this.wizardStart = true;
    this.wizardDestinazione = false;
    this.wizardDatiDestinazione = false;
    this.wizardDati = false;
    this.wizardCatastali = false;
    this.wizardCointestatari = false;
    this.wizardTassazione = false;

    this.tassaSelezionata = new TassaDettaglio();
    this.cointestatarioSelezionato = new CointestatarioDettaglio();

    this.headP1 = "";
    this.headP2 = "";
  }

  public goToDestinazione(): void {
    this.wizardStart = false;
    this.wizardDestinazione = true;
    this.wizardDatiDestinazione = false;
    this.wizardDati = false;
    this.wizardCatastali = false;
    this.wizardCointestatari = false;
    this.wizardTassazione = false;
  }

  public goToDatiDestinazione(): void {
    this.wizardStart = false;
    this.wizardDestinazione = false;
    this.wizardDatiDestinazione = true;
    this.wizardDati = false;
    this.wizardCatastali = false;
    this.wizardCointestatari = false;
    this.wizardTassazione = false;
  }

  public goToDati(): void {
    this.wizardStart = false;
    this.wizardDestinazione = false;
    this.wizardDatiDestinazione = false;
    this.wizardDati = true;
    this.wizardCatastali = false;
    this.wizardCointestatari = false;
    this.wizardTassazione = false;
  }

  public goToCatastali(): void {
    this.wizardStart = false;
    this.wizardDestinazione = false;
    this.wizardDatiDestinazione = false;
    this.wizardDati = false;
    this.wizardCatastali = true;
    this.wizardCointestatari = false;
    this.wizardTassazione = false;
  }

  public goToCointestatari(): void {
    this.wizardStart = false;
    this.wizardDestinazione = false;
    this.wizardDatiDestinazione = false;
    this.wizardDati = false;
    this.wizardCatastali = false;
    this.wizardCointestatari = true;
    this.wizardTassazione = false;
  }

  public goToTassazione(): void {
    this.wizardStart = false;
    this.wizardDestinazione = false;
    this.wizardDatiDestinazione = false;
    this.wizardDati = false;
    this.wizardCatastali = false;
    this.wizardCointestatari = false;
    this.wizardTassazione = true;
  }

  public goToStart(): void {
    this.wizardStart = true;
    this.wizardDestinazione = false;
    this.wizardDatiDestinazione = false;
    this.wizardDati = false;
    this.wizardCatastali = false;
    this.wizardCointestatari = false;
    this.wizardTassazione = false;
  }

  public salvaImmobile(): void {
    this.immobiliService.putImmobile(this.immobile, '').subscribe(r => {
      if (r.Success) {
        // salvataggio andato a buon fine. Riporto alla home (?)
        this.router.navigate(['home']);
      } else {
        this.logError(1, ""); // mettere i dati corretti per l'errore
        this.presentErrorAlert("Si è verificato un errore nel salvataggio dell'immobile: " + r.ErrorMessage.msg_testo);
      }
    });
  }

  public setTasso(tasso: string): void {
    this.immobile.mutuo_dettaglio.tipo_tasso = tasso;
  }

  public selezionaTipoAffittuario(val: any): void {
    this.immobile.affitto_dettaglio.tipo_affittuario_id = val.selectedOptions[0].value;
  }

  public selezionaOmi(val: any): void {
    this.immobile.comune_zone_cod = val.selectedOptions[0].value;
  }

  public selezionaTassa(val: any): void {
    this.tassaSelezionata.tassa_id = val.selectedOptions[0].value;
    this.tassaSelezionata.descrizione_tassa = val.selectedOptions[0].innerText.trim();
  }

  public aggiungiTassa(): void {

    if (this.tassaSelezionata.tassa_id === 0) {
      this.presentAlert("Selezionare una tassa dalla lista");
    } else {

      const tassaDaAggiungere: TassaDettaglio = new TassaDettaglio();
      tassaDaAggiungere.descrizione_tassa = this.tassaSelezionata.descrizione_tassa;
      tassaDaAggiungere.importo_annuale = this.tassaSelezionata.importo_annuale;
      tassaDaAggiungere.proprieta_tasse_id = this.tassaSelezionata.proprieta_tasse_id;
      tassaDaAggiungere.tassa_id = this.tassaSelezionata.tassa_id;

      this.immobile.tasse.push(tassaDaAggiungere);

      // svuoto la tassa selezionata
      this.tassaSelezionata.descrizione_tassa = "";
      this.tassaSelezionata.tassa_id = 0;
      this.tassaSelezionata.importo_annuale = 0;
    }
  }

  public rimuoviTassa(tassa: TassaDettaglio): void {
    const index = this.immobile.tasse.indexOf(tassa, 0);
    if (index > -1) {
      this.immobile.tasse.splice(index, 1);
    }
  }

  public aggiungiCointestatario(): void {

    const cointestatarioDaAggiungere = new CointestatarioDettaglio();
    cointestatarioDaAggiungere.nominativo = this.cointestatarioSelezionato.nominativo;
    cointestatarioDaAggiungere.codice_fiscale = this.cointestatarioSelezionato.codice_fiscale;
    cointestatarioDaAggiungere.quota = this.cointestatarioSelezionato.quota;

    this.immobile.cointestatari.push(cointestatarioDaAggiungere);

    this.cointestatarioSelezionato.codice_fiscale = '';
    this.cointestatarioSelezionato.nominativo = '';
    this.cointestatarioSelezionato.quota = 0;
  }

  public rimuoviCointestatario(cointestatario: CointestatarioDettaglio): void {
    const index = this.immobile.cointestatari.indexOf(cointestatario, 0);
    if (index > -1) {
      this.immobile.cointestatari.splice(index, 1);
    }
  }

  public scegliDestinazione(primacasa: boolean, residente: boolean, affittata: boolean): void {
    this.primacasa = primacasa;
    this.residente = residente;
    this.affittata = affittata;
    this.headP1 = (this.primacasa ? "Prima casa" : "Seconda casa");
    this.headP2 = (this.residente ? "Residente" : "Non residente");
    this.goToDatiDestinazione();
  }

  public caricaOmi(): void {
    this.tipiOmi = this.dropdownService.getTipiOmi("");
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadCliente();

    this.tipologieTasse = this.dropdownService.getTipologieTasse();
    this.tipiAffittuario = this.dropdownService.getTipiAffittuari();
    this.euribor = this.dropdownService.getEuribor();

    this.cointestatarioSelezionato.nominativo = this.cliente.cognome + ' ' + this.cliente.nome;
    this.cointestatarioSelezionato.quota = 100;
    this.cointestatarioSelezionato.codice_fiscale = this.cliente.codice_fiscale;
  }

}
