import { Component, OnInit, NgZone } from '@angular/core';
import { StoreService, ImmobileDettaglio, ImmobiliService, AlertService, LogErroriService, WsLogErrore, CointestatarioDettaglio, TassaDettaglio, SpesaDettaglio, AffittoDettaglio, MutuoDettaglio, DatiCatastaliDettaglio, OmiDettaglio, DdlItem, SessionService, DropdownService, IconeService, DdlItemSearch } from 'broker-lib';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/base.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.page.html',
  styleUrls: ['./wizard.page.scss'],
})
export class WizardPage extends BaseComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  public selectControl = new FormControl();

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
  public categorieCatastali: Array<DdlItem>;

  public tassaSelezionata: TassaDettaglio;
  public importoTassaSelezionataString = '0';
  public cointestatarioSelezionato: CointestatarioDettaglio;
  public importoQuotaCointestatarioSelezionataString = '0';

  public primacasa: boolean;
  public residente: boolean;
  public affittata: boolean;

  public headP1: string;
  public headP2: string;

  public dataInizioMutuo: Date = new Date();
  public dataInizioAffitto: Date = new Date();

  public isNewImmobile: boolean;

  // queste sono le variabili relative ai campi input che devono contenere la virgola in
  // interfaccia ma che devono essere inviati come float e con il punto come separatore
  public ValoreAcquistoString = '0';

  public MutuoDettaglioSpreadString = '0';
  public MutuoDettaglioTassoFissoString = '0';
  public MutuoDettaglioEuriborId = '0';
  public MutuoDettaglioDurata = '0';
  public MutuoDettaglioImportoIniziale = '0';

  public AffittoDettaglioSpeseCondominialiString = '0';
  public AffittoDettaglioMensileString = '0';
  public AffittoDettaglioAliquotaCedolareString = '0';
  public AffittoDettaglioTipoAffittuarioIdString = '0';
  public AffittoDettaglioPrimaScadenzaAnniString = '0';
  public AffittoDettaglioImportoMensileString = '0';

  public DatiCatastaliRenditaString = '0';
  public DatiCatastaliSuperficieInterniString = '0';
  public DatiCatastaliSuperficieTotaleString = '0';

  public form: FormGroup;

  public ddlConfig = {
    search: true,
    searchOnKey: 'descrizione',
    noResultsFound: 'non ci sono risultati',
    placeholder: 'scegli il comune',
    clearOnSelection: false,
    displayKey: 'descrizione',
    limitTo: 10
  };
  public ddlComuniOptions: Array<DdlItem>;
  public ddlComuneSelected: DdlItem;

  public selectedCategoriaCatastale: DdlItem;

  constructor(
    private immobiliService: ImmobiliService,
    public router: Router,
    public alertService: AlertService,
    public logErroriService: LogErroriService,
    public sessionService: SessionService,
    private dropdownService: DropdownService,
    public storeService: StoreService,
    public iconeService: IconeService,
    private fb: FormBuilder,
    public ngZone: NgZone,
    public logoutComm: LogoutCommunicationService
  ) {

    super(sessionService, storeService, router, logErroriService, alertService, iconeService, ngZone);

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
    this.tassaSelezionata.descrizione_tassa = "";
    this.tassaSelezionata.tassa_id = 0;
    this.tassaSelezionata.importo_annuale = 0;

    this.cointestatarioSelezionato = new CointestatarioDettaglio();

    this.headP1 = "";
    this.headP2 = "";

    this.isNewImmobile = true;

    this.ddlComuniOptions = new Array<DdlItem>();
    this.ddlComuneSelected = new DdlItem();

    this.categorieCatastali = new Array<DdlItem>();
    this.tipologieTasse = new Array<DdlItem>();
    this.euribor = new Array<DdlItem>();
    this.tipiAffittuario = new Array<DdlItem>();

    this.selectedCategoriaCatastale = new DdlItem();
  }

  ngOnInit() {
    super.ngOnInit();
    this.form = this.fb.group({
      select: new FormControl(null),
    });
    this.immobile = new ImmobileDettaglio();
    this.normalizzaImmobile();
  }

  ionViewDidEnter() {
    this.initializeApp();
  }

  private initializeApp() {

    this.logoutComm.logoutObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      this.ngZone.run(() => this.router.navigate(['login'])).then();
    });

    this.ddlComuniOptions = new Array<DdlItem>();

    // RECUPERO IL CLIENTE DALLA SESSIONE
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

      } else {
        this.goToPage('login');
      }
    });
    this.sessionService.loadUserData();

    // RECUPERO IMMOBILE DALLA SESSIONE
    const immobileInSessione = this.sessionService.getImmobileDettaglio();
    if (immobileInSessione !== undefined && immobileInSessione !== null) {
      this.isNewImmobile = false;
      this.immobile = immobileInSessione;

      this.inizializzaCampiStringa();

      if (this.immobile.citta !== '') {
        const ddlItem = new DdlItem();
        ddlItem.codice = this.immobile.catastale_cod;
        ddlItem.descrizione = this.immobile.citta;
        this.ddlComuniOptions.push(ddlItem);
        this.select.setValue(this.ddlComuniOptions[0].codice);
        console.log("SELECTED: " + this.select.value);
      }
      this.gestisciStatiDestinazione(this.immobile.prima_casa, this.immobile.destinazione_uso_id === 1, this.immobile.affitto); // sulla residenza non ho il dato nell'immobile

      this.loadDdlTipologieCatastali();

      // carico gli omi relativi al codice istat
      this.caricaOmi();

    } else {
      this.pulisciImmobile();
      this.loadDdlTipologieCatastali();
    }
    this.immobile.codice_fiscale = this.sessionService.getCliente().codice_fiscale;
    this.normalizzaImmobile();

    // GESTIONE CENTRALIZZATA DEI DROPDOWN
    this.loadDdlEuribor();
    this.loadDdlTipiAffittuari();
    this.loadDdlTipologieTasse();

    // this.cointestatarioSelezionato.nominativo = this.sessionService.getCliente().cognome + ' ' + this.sessionService.getCliente().nome;
    // this.cointestatarioSelezionato.quota = 100;
    // this.cointestatarioSelezionato.codice_fiscale = this.sessionService.getCliente().codice_fiscale;
  }

  private inizializzaCampiStringa() {
    this.ValoreAcquistoString = (this.immobile.valore_acquisto + '').replace('.', ',');

    if (this.immobile.mutuo_dettaglio !== undefined) {
      this.dataInizioMutuo = new Date(+this.immobile.mutuo_dettaglio.data_inizio);
      this.MutuoDettaglioTassoFissoString = (this.immobile.mutuo_dettaglio.tasso_fisso + '').replace('.', ',');
      this.MutuoDettaglioSpreadString = (this.immobile.mutuo_dettaglio.spread + '').replace('.', ',');
      this.MutuoDettaglioEuriborId = (this.immobile.mutuo_dettaglio.euribor_id + '').replace('.', ',');
      this.MutuoDettaglioDurata = (this.immobile.mutuo_dettaglio.durata + '').replace('.', ',');
      this.MutuoDettaglioImportoIniziale = (this.immobile.mutuo_dettaglio.importo_iniziale + '').replace('.', ',');
    } else {
      this.dataInizioMutuo = new Date();
    }

    if (this.immobile.affitto_dettaglio !== undefined) {
      this.dataInizioAffitto = new Date(+this.immobile.affitto_dettaglio.data_inizio);
      this.AffittoDettaglioSpeseCondominialiString = (this.immobile.affitto_dettaglio.importo_spese_condominiali + '').replace('.', ',');
      this.AffittoDettaglioMensileString = (this.immobile.affitto_dettaglio.importo_mensile + '').replace('.', ',');
      this.AffittoDettaglioAliquotaCedolareString = (this.immobile.affitto_dettaglio.aliquota_cedolare + '').replace('.', ',');
      this.AffittoDettaglioTipoAffittuarioIdString = (this.immobile.affitto_dettaglio.tipo_affittuario_id + '').replace('.', ',');
      this.AffittoDettaglioPrimaScadenzaAnniString = (this.immobile.affitto_dettaglio.prima_scadenza_anni + '').replace('.', ',');
    } else {
      this.dataInizioAffitto = new Date();
    }

    if (this.immobile.dati_catastali !== undefined) {
      this.DatiCatastaliRenditaString = (this.immobile.dati_catastali.rendita + '').replace('.', ',');
      this.DatiCatastaliSuperficieInterniString = (this.immobile.dati_catastali.superficie_interni + '').replace('.', ',');
      this.DatiCatastaliSuperficieTotaleString = (this.immobile.dati_catastali.superficie_totale + '').replace('.', ',');
    }
  }

  private normalizzaCampiStringa() {
    this.immobile.valore_acquisto = parseFloat(this.ValoreAcquistoString.replace(',', '.'));

    if (this.immobile.mutuo_dettaglio !== undefined) {
      this.immobile.mutuo_dettaglio.tasso_fisso = parseFloat(this.MutuoDettaglioTassoFissoString.replace(',', '.'));
      this.immobile.mutuo_dettaglio.spread = parseFloat(this.MutuoDettaglioSpreadString.replace(',', '.'));
      this.immobile.mutuo_dettaglio.euribor_id = parseFloat(this.MutuoDettaglioEuriborId.replace(',', '.'));
      this.immobile.mutuo_dettaglio.durata = parseFloat(this.MutuoDettaglioDurata.replace(',', '.'));
      this.immobile.mutuo_dettaglio.importo_iniziale = parseFloat(this.MutuoDettaglioImportoIniziale.replace(',', '.'));
    }
    if (this.immobile.affitto_dettaglio !== undefined) {
      this.immobile.affitto_dettaglio.importo_spese_condominiali = parseFloat(this.AffittoDettaglioSpeseCondominialiString.replace(',', '.'));
      this.immobile.affitto_dettaglio.importo_mensile = parseFloat(this.AffittoDettaglioMensileString.replace(',', '.'));
      this.immobile.affitto_dettaglio.aliquota_cedolare = parseFloat(this.AffittoDettaglioAliquotaCedolareString.replace(',', '.'));
      this.immobile.affitto_dettaglio.tipo_affittuario_id = parseFloat(this.AffittoDettaglioTipoAffittuarioIdString.replace(',', '.'));
      this.immobile.affitto_dettaglio.prima_scadenza_anni = parseFloat(this.AffittoDettaglioPrimaScadenzaAnniString.replace(',', '.'));
    }
    if (this.immobile.dati_catastali !== undefined) {
      this.immobile.dati_catastali.rendita = parseFloat(this.DatiCatastaliRenditaString.replace(',', '.'));
      this.immobile.dati_catastali.superficie_interni = parseFloat(this.DatiCatastaliSuperficieInterniString.replace(',', '.'));
      this.immobile.dati_catastali.superficie_totale = parseFloat(this.DatiCatastaliSuperficieTotaleString.replace(',', '.'));
    }
  }

  private pulisciImmobile() {
    this.immobile = new ImmobileDettaglio();
    this.MutuoDettaglioTassoFissoString = "";
    this.MutuoDettaglioSpreadString = "";
    this.dataInizioMutuo = new Date();
    this.dataInizioAffitto = new Date();
  }

  private loadDdlTipologieTasse() {
    this.tipologieTasse = new Array<DdlItem>();
    this.dropdownService.getTipologieTasse(false, false, false).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if (r.Success) {

        const emptyItem = new DdlItem();
        emptyItem.codice = '';
        emptyItem.descrizione = '';
        this.tipologieTasse.push(emptyItem);
        this.tipologieTasse = this.tipologieTasse.concat(r.Data.elenco_filtrato);
      } else {
        this.manageError(r);
      }
    },
      (error) => {
        this.manageHttpError(error);
      });
  }

  private loadDdlEuribor() {
    this.euribor = new Array<DdlItem>();
    this.dropdownService.getEuribor().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if (r.Success) {

        const emptyItem = new DdlItem();
        emptyItem.codice = '';
        emptyItem.descrizione = '';
        this.euribor.push(emptyItem);
        this.euribor = this.euribor.concat(r.Data.elenco_filtrato);
      } else {
        this.manageError(r);
      }
    },
      (error) => {
        this.manageHttpError(error);
      });
  }

  private loadDdlTipiAffittuari() {
    this.tipiAffittuario = new Array<DdlItem>();
    this.dropdownService.getTipiAffittuari().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if (r.Success) {

        const emptyItem = new DdlItem();
        emptyItem.codice = '';
        emptyItem.descrizione = '';
        this.tipiAffittuario.push(emptyItem);
        this.tipiAffittuario = this.tipiAffittuario.concat(r.Data.elenco_filtrato);
      } else {
        this.manageError(r);
      }
    },
      (error) => {
        this.manageHttpError(error);
      });
  }

  private loadDdlTipologieCatastali() {
    this.categorieCatastali = new Array<DdlItem>();
    this.dropdownService.getTipologieCatastali().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if (r.Success) {

        const emptyItem = new DdlItem();
        emptyItem.codice = '';
        emptyItem.descrizione = '';
        this.categorieCatastali.push(emptyItem);
        this.categorieCatastali = this.categorieCatastali.concat(r.Data.elenco_filtrato);
      } else {
        this.manageError(r);
      }
    },
      (error) => {
        this.manageHttpError(error);
      });
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
    if (!this.immobile.affitto) {
      this.goToCatastali();
    } else {
      this.wizardStart = false;
      this.wizardDestinazione = false;
      this.wizardDatiDestinazione = false;
      this.wizardDati = true;
      this.wizardCatastali = false;
      this.wizardCointestatari = false;
      this.wizardTassazione = false;
    }
  }

  public goToDatiBack(): void {
    if (!this.immobile.affitto) {
      this.goToDatiDestinazione();
    } else {
      this.wizardStart = false;
      this.wizardDestinazione = false;
      this.wizardDatiDestinazione = false;
      this.wizardDati = true;
      this.wizardCatastali = false;
      this.wizardCointestatari = false;
      this.wizardTassazione = false;
    }
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
    // tolgo quello che non serve
    if (!this.immobile.affitto) {
      delete this.immobile.affitto_dettaglio;
    } else {
      this.immobile.affitto_dettaglio.data_inizio = this.dataInizioAffitto.getTime();
    }
    if (!this.immobile.mutuo) {
      delete this.immobile.mutuo_dettaglio;
    } else {
      this.immobile.mutuo_dettaglio.data_inizio = this.dataInizioMutuo.getTime();
    }
    if (this.immobile.tasse && this.immobile.tasse.length === 0) {
      delete this.immobile.tasse;
    }
    if (this.immobile.cointestatari && this.immobile.cointestatari.length === 0) {
      delete this.immobile.cointestatari;
    }
    if (this.immobile.spese && this.immobile.spese.length === 0) {
      delete this.immobile.spese;
    }

    this.normalizzaCampiStringa();

    console.log(JSON.stringify(this.immobile));

    // eseguo la chiamata
    this.immobiliService.putImmobile(this.immobile).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if (r.Success) {
        // salvataggio andato a buon fine. Riporto alla home (?)
        this.goToStart();
        this.router.navigate(['home']);
      } else {
        this.logError(1, ""); // mettere i dati corretti per l'errore
        this.presentErrorAlert("Si è verificato un errore nel salvataggio dell'immobile: " + r.ErrorMessage.msg_testo);
      }
    },
      (error) => {
        this.manageHttpError(error);
      });
  }

  public setTasso(tasso: string): void {
    this.immobile.mutuo_dettaglio.tipo_tasso = tasso;
  }

  public selezionaEuribor(val: any): void {
    if (val.selectedOptions[0].value === 0) {
      this.alertService.presentAlert('Scegliere un valore dal menu a tendina');
    } else {
      this.immobile.mutuo_dettaglio.euribor_id = parseInt(val.selectedOptions[0].value, 10);
    }
  }

  public selezionaTipoAffittuario(val: any): void {
    if (val.selectedOptions[0].value === 0) {
      this.alertService.presentAlert('Scegliere un valore dal menu a tendina dei tipi affittuario');
    } else {
      this.immobile.affitto_dettaglio.tipo_affittuario_id = parseInt(val.selectedOptions[0].value, 10);
    }
  }

  public selezionaOmi(val: any): void {
    if (val.selectedOptions[0].value === 0) {
      this.alertService.presentAlert('Scegliere un valore dal menu a tendina degli OMI');
    } else {
      this.immobile.comune_zone_cod = val.selectedOptions[0].value;
    }
  }

  public selezionaCategoriaCatastale(val: any): void {
    if (val.selectedOptions[0].value === "0" || val.selectedOptions[0].value === "") {
      this.alertService.presentAlert('Scegliere un valore dal menu a tendina delle categorie catastali');
    } else {
      this.immobile.tipologie_catastali_id = parseInt(val.selectedOptions[0].value, 10);
    }
  }

  public selezionaTassa(val: any): void {
    if (val.selectedOptions[0].value === "0" || val.selectedOptions[0].value === "") {
      this.alertService.presentAlert('Scegliere un valore dal menu a tendina delle tasse');
    } else {
      this.tassaSelezionata.tassa_id = val.selectedOptions[0].value;
      this.tassaSelezionata.descrizione_tassa = val.selectedOptions[0].innerText.trim();
    }
  }

  public aggiungiTassa(): void {

    if (!this.tassaSelezionata || this.tassaSelezionata.tassa_id === 0) {
      this.presentAlert("Selezionare una tassa dalla lista");
    } else {

      const tassaDaAggiungere: TassaDettaglio = new TassaDettaglio();
      tassaDaAggiungere.descrizione_tassa = this.tassaSelezionata.descrizione_tassa;
      tassaDaAggiungere.importo_annuale = parseFloat(this.importoTassaSelezionataString.replace(',', '.'));
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

    const pattern = /^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$/;

    if (this.cointestatarioSelezionato.codice_fiscale === '') {
      this.alertService.presentAlert('il codice fiscale è obbligatorio');
    } else if (this.cointestatarioSelezionato.codice_fiscale.search(pattern) === -1) {
      this.alertService.presentAlert('il codice fiscale inserito non è valido');
    } else {
      const cointestatarioDaAggiungere = new CointestatarioDettaglio();
      cointestatarioDaAggiungere.nominativo = this.cointestatarioSelezionato.nominativo;
      cointestatarioDaAggiungere.codice_fiscale = this.cointestatarioSelezionato.codice_fiscale;
      cointestatarioDaAggiungere.quota = parseFloat(this.importoQuotaCointestatarioSelezionataString.replace(',', '.'));


      if (this.cointestatarioSelezionato.quota > 100 || this.cointestatarioSelezionato.quota < 0) {
        this.alertService.presentAlert('La quota deve essere un numero compreso tra 0 e 100');
      } else if (this.codiceFiscaleCointestatarioPresente(this.cointestatarioSelezionato.codice_fiscale)) {
        this.alertService.presentAlert('Il codice fiscale inserito è già presente in elenco');
      } else {
        this.immobile.cointestatari.push(cointestatarioDaAggiungere);

        this.cointestatarioSelezionato.codice_fiscale = '';
        this.cointestatarioSelezionato.nominativo = '';
        this.cointestatarioSelezionato.quota = 0;
      }
    }
  }

  private codiceFiscaleCointestatarioPresente(cf: string): boolean {
    for (const coint of this.immobile.cointestatari) {
      if (coint.codice_fiscale.toUpperCase() === cf.toUpperCase()) {
        return true;
      }
    }
    return false;
  }

  public rimuoviCointestatario(cointestatario: CointestatarioDettaglio): void {
    const index = this.immobile.cointestatari.indexOf(cointestatario, 0);
    if (index > -1) {
      this.immobile.cointestatari.splice(index, 1);
    }
  }

  public scegliDestinazione(primacasa: boolean, residente: boolean, affittata: boolean): void {
    this.gestisciStatiDestinazione(primacasa, residente, affittata);
    this.goToDatiDestinazione();
  }

  public gestisciStatiDestinazione(primacasa: boolean, residente: boolean, affittata: boolean) {
    this.immobile.prima_casa = primacasa;
    this.immobile.affitto = affittata;
    this.primacasa = primacasa;
    this.residente = residente;
    this.affittata = affittata;
    this.headP1 = (this.primacasa ? "Prima casa" : "Seconda casa");
    this.headP2 = (this.residente ? "Residente" : "Non residente");
    this.isNewImmobile = false;
  }

  public caricaOmi(): void {
    this.dropdownService.getTipiOmi(this.immobile.catastale_cod).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if (r.Success) {
        this.tipiOmi = new Array<DdlItem>();
        const emptyItem = new DdlItem();
        emptyItem.codice = '';
        emptyItem.descrizione = '';
        this.tipiOmi.push(emptyItem);
        this.tipiOmi = this.tipiOmi.concat(r.Data.elenco_filtrato);
      } else {
        this.manageError(r);
      }
    },
      (error) => {
        this.manageHttpError(error);
      });
    // this.tipiOmi = this.dropdownService.getTipiOmi("");
  }

  private normalizzaImmobile(): void {
    if (!this.immobile.cointestatari) {
      const cointestatari: Array<CointestatarioDettaglio> = new Array<CointestatarioDettaglio>();
      this.immobile.cointestatari = cointestatari;
    }
    if (!this.immobile.tasse) {
      const tasse: Array<TassaDettaglio> = new Array<TassaDettaglio>();
      this.immobile.tasse = tasse;
    }
    if (!this.immobile.spese) {
      const spese: Array<SpesaDettaglio> = new Array<SpesaDettaglio>();
      this.immobile.spese = spese;
    }
    if (!this.immobile.affitto_dettaglio) {
      const affitto: AffittoDettaglio = new AffittoDettaglio();
      this.immobile.affitto_dettaglio = affitto;
    }
    if (!this.immobile.mutuo_dettaglio) {
      const mutuo: MutuoDettaglio = new MutuoDettaglio();
      this.immobile.mutuo_dettaglio = mutuo;
    }
    if (!this.immobile.dati_catastali) {
      const datiCatastali: DatiCatastaliDettaglio = new DatiCatastaliDettaglio();
      this.immobile.dati_catastali = datiCatastali;
    }
    if (!this.immobile.omi) {
      const omi: OmiDettaglio = new OmiDettaglio();
      this.immobile.omi = omi;
    }
  }

  public changeMutuo(event: any) {
    if (!event) {
      // pulisci tutti i campi della pagina mutuo
      this.immobile.mutuo_dettaglio.tipo_tasso = 'V';
      this.immobile.mutuo_dettaglio.euribor_id = 0;
      this.immobile.mutuo_dettaglio.spread = 0;
      this.immobile.mutuo_dettaglio.durata = 0;
      this.dataInizioMutuo = new Date();
      this.immobile.mutuo_dettaglio.importo_iniziale = 0;
    }
  }

  public avantiIndirizzoImmobile(): boolean {
    const goOn = !(this.immobile.civico === undefined || this.immobile.civico === '') &&
      !(this.immobile.citta === undefined || this.immobile.citta === '') &&
      !(this.immobile.cap === undefined || this.immobile.cap === '') &&
      !(this.immobile.catastale_cod === undefined || this.immobile.catastale_cod === '' || this.immobile.catastale_cod === '0') &&
      !(this.immobile.tipologie_catastali_id === undefined || this.immobile.tipologie_catastali_id === 0);
    // !(this.immobile.comune_zone_cod === undefined || this.immobile.comune_zone_cod === '' || this.immobile.comune_zone_cod === '0');

    return goOn;
  }

  public comuneSearchChange($event: any) {
    const input = $event as string;
    if (input.length === 3) {
      // eseguo la ricerca
      this.ddlComuniOptions = new Array<DdlItem>();
      this.dropdownService.getComuni(input).subscribe(r => {
        if (r.Success) {
          // this.ddlComuniOptions = new Array<DdlItem>();
          this.ddlComuniOptions.splice(0, this.ddlComuniOptions.length); // svuoto dal vecchio contenuto
          // aggiorna la lista del dropdown
          for (const entry of r.Data.elenco_filtrato) {
            this.ddlComuniOptions.push(entry as DdlItem);
          }
          console.log('numero elementi: ' + this.ddlComuniOptions.length);
        } else {
          this.manageError(r);
        }
      },
        (error) => {
          this.manageHttpError(error);
        });
    }
    return $event;
  }

  public comuneSelected($event: any) {
    console.log('comune selezionato ' + JSON.stringify($event));
    if ($event[0] !== undefined) {
      const codiceComuneSelezionato = $event[0].value;
      console.log('codice comune selezionato ' + codiceComuneSelezionato);
      this.immobile.citta = $event[0].text;
      this.immobile.catastale_cod = codiceComuneSelezionato;
      this.caricaOmi();
    }
  }

  public associaData($event) {
    this.dataInizioMutuo = $event;
  }

  public associaDataAffitto($event) {
    this.dataInizioAffitto = $event;
  }

  ionViewDidLeave() {
    this.goToStart();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get select() {
    return this.form.get('select') as FormControl;
  }
}
