import { Component, OnInit } from '@angular/core';
import { StoreService, ImmobileDettaglio, ImmobiliService, AlertService, LogErroriService, WsLogErrore, CointestatarioDettaglio, TassaDettaglio, SpesaDettaglio, AffittoDettaglio, MutuoDettaglio, DatiCatastaliDettaglio, OmiDettaglio, DdlItem, SessionService, DropdownService, IconeService } from 'broker-lib';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/base.component';
import { RaDatePipe } from 'src/app/pipes/date.pipe';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.page.html',
  styleUrls: ['./wizard.page.scss'],
})
export class WizardPage extends BaseComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

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
    public iconeService: IconeService
  ) {

    super(sessionService, storeService, router, logErroriService, alertService, iconeService);

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

  ngOnInit() {
    super.ngOnInit();
    this.immobile = new ImmobileDettaglio();
    this.normalizzaImmobile();
  }

  ionViewDidEnter() {
    this.initializeApp();
  }

  private initializeApp() {
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
        this.alertService.presentAlert('Token assente, necessario login');
        this.goToPage('login');
      }
    });
    this.sessionService.loadUserData();

    // RECUPERO IMMOBILE DALLA SESSIONE
    const immobileInSessione = this.sessionService.getImmobileDettaglio();
    if (immobileInSessione !== undefined && immobileInSessione !== null) {
      this.immobile = immobileInSessione;
      if (this.immobile.mutuo_dettaglio !== undefined) {
        this.dataInizioMutuo = new Date(+this.immobile.mutuo_dettaglio.data_inizio);
      } else {
        this.dataInizioMutuo = new Date(0);
      }
    } else {
      this.immobile = new ImmobileDettaglio();
    }
    this.immobile.codice_fiscale = this.sessionService.getCliente().codice_fiscale;
    this.normalizzaImmobile();

    // GESTIONE CENTRALIZZATA DEI DROPDOWN
    this.dropdownService.getTipologieTasse(false, false, false).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if (r.Success) {
        this.tipologieTasse = r.Data.elenco_filtrato;
      } else {
        this.manageError(r);
      }
    });

    this.dropdownService.getEuribor().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if (r.Success) {
        this.euribor = r.Data.elenco_filtrato;
      } else {
        this.manageError(r);
      }
    });

    this.dropdownService.getTipiAffittuari().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if (r.Success) {
        this.tipiAffittuario = r.Data.elenco_filtrato;
      } else {
        this.manageError(r);
      }
    });

    this.dropdownService.getTipologieCatastali().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if (r.Success) {
        this.categorieCatastali = r.Data.elenco_filtrato;
      } else {
        this.manageError(r);
      }
    });

    this.cointestatarioSelezionato.nominativo = this.sessionService.getCliente().cognome + ' ' + this.sessionService.getCliente().nome;
    this.cointestatarioSelezionato.quota = 100;
    this.cointestatarioSelezionato.codice_fiscale = this.sessionService.getCliente().codice_fiscale;
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
    }
    if (!this.immobile.mutuo) {
      delete this.immobile.mutuo_dettaglio;
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
    console.log(this.immobile);

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
    });
  }

  public setTasso(tasso: string): void {
    this.immobile.mutuo_dettaglio.tipo_tasso = tasso;
  }

  public selezionaEuribor(val: any): void {
    this.immobile.mutuo_dettaglio.euribor_id = val.selectedOptions[0].value;
  }

  public selezionaTipoAffittuario(val: any): void {
    this.immobile.affitto_dettaglio.tipo_affittuario_id = val.selectedOptions[0].value;
  }

  public selezionaOmi(val: any): void {
    this.immobile.comune_zone_cod = val.selectedOptions[0].value;
  }

  public selezionaCategoriaCatastale(val: any): void {
    this.immobile.catastale_cod = val.selectedOptions[0].value;
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
    this.immobile.prima_casa = primacasa;
    this.immobile.affitto = affittata;
    this.primacasa = primacasa;
    this.residente = residente;
    this.affittata = affittata;
    this.headP1 = (this.primacasa ? "Prima casa" : "Seconda casa");
    this.headP2 = (this.residente ? "Residente" : "Non residente");
    this.goToDatiDestinazione();
  }

  public caricaOmi(): void {
    this.dropdownService.getTipiOmi(this.immobile.istat_cod).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if (r.Success) {
        this.tipiOmi = r.Data.elenco_filtrato;
      } else {
        this.manageError(r);
      }
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
      this.dataInizioMutuo = new Date(0);
      this.immobile.mutuo_dettaglio.importo_iniziale = 0;
    }
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
