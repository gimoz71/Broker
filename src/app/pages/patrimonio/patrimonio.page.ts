import { Component, OnInit, NgZone } from '@angular/core';
import { BaseComponent } from 'src/app/component/base.component';
import { SessionService, StoreService, LogErroriService, AlertService, ClientiService, LoginService, BookValue, IconeService } from 'broker-lib';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-patrimonio',
  templateUrl: './patrimonio.page.html',
  styleUrls: ['./patrimonio.page.scss'],
})
export class PatrimonioPage extends BaseComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  public patrimoniA: Array<BookValue>;
  public patrimoniC: Array<BookValue>;
  public patrimoniT: Array<BookValue>;
  public patrimoniX: Array<BookValue>;

  public totalePatrimoniA: number;
  public totalePatrimoniC: number;
  public totalePatrimoniT: number;
  public totalePatrimoniX: number;

  constructor(
    public sessionService: SessionService,
    public storeService: StoreService,
    public router: Router,
    public logErroriService: LogErroriService,
    public alertService: AlertService,
    public clientiService: ClientiService,
    public loginService: LoginService,
    public iconeService: IconeService,
    public ngZone: NgZone,
    public logoutComm: LogoutCommunicationService,
    public currencyPipe: CurrencyPipe
  ) {
    super(sessionService, storeService, router, logErroriService, alertService, iconeService, ngZone);
    this.patrimoniA = new Array<BookValue>();
    this.patrimoniC = new Array<BookValue>();
    this.patrimoniT = new Array<BookValue>();
    this.patrimoniX = new Array<BookValue>();
    this.totalePatrimoniA = 0;
    this.totalePatrimoniC = 0;
    this.totalePatrimoniT = 0;
    this.totalePatrimoniX = 0;
    registerLocaleData(localeIt, 'it');
  }

  public getCurrency(amount: number) {
      return this.currencyPipe.transform(amount, 'EUR', '', '1.2-2', 'it');
  }

  ngOnInit() {
    super.ngOnInit();

    // // carico i patrimoni del cliente selezionato
    // this.cliente = this.getCliente();
    // if (this.cliente.cliente_id === 0 || this.cliente.cliente_id === undefined) {
    //   // non ho clienti selezionati
    //   this.presentAlert("E' necessario selezionare un cliente");
    //   this.goToPage('home');
    // }
    // this.immobiliCliente = this.sessionService.getImmobiliCliente();

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
    // ottengo il token
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

    this.clientiService.getBookValue(cliente_id).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if (r.Success) {
        if (r.Data.elencoTipologieCatastaliA) {
          this.patrimoniA = r.Data.elencoTipologieCatastaliA;
          this.calcolaTotalePatrimoniA();
        }
        if (r.Data.elencoTipologieCatastaliC) {
          this.patrimoniC = r.Data.elencoTipologieCatastaliC;
          this.calcolaTotalePatrimoniC();
        }
        if (r.Data.elencoTipologieCatastaliT) {
          this.patrimoniT = r.Data.elencoTipologieCatastaliT;
          this.calcolaTotalePatrimoniT();
        }
        if (r.Data.elencoTipologieCatastaliAltro) {
          this.patrimoniX = r.Data.elencoTipologieCatastaliAltro;
          this.calcolaTotalePatrimoniX();
        }
      } else {
        this.manageError(r);
      }
    },
      (error) => {
        this.manageHttpError(error);
      });
  }

  private logout(): void {

  }

  public apriSchedaImmobile(immobile: number) {
    // this.router.navigate(['scheda-immobile'], { queryParams: { immobile_id: immobile } });
    this.goToPageParams('scheda-immobile', { queryParams: { immobile_id: immobile } });
  }

  public calcolaTotalePatrimoniA(): void {
    for (const pat of this.patrimoniA) {
      this.totalePatrimoniA += +pat.book_value;
    }
  }

  public calcolaTotalePatrimoniC(): void {
    for (const pat of this.patrimoniC) {
      this.totalePatrimoniC += +pat.book_value;
    }
  }

  public calcolaTotalePatrimoniT(): void {
    for (const pat of this.patrimoniT) {
      this.totalePatrimoniT += +pat.book_value;
    }
  }

  public calcolaTotalePatrimoniX(): void {
    for (const pat of this.patrimoniX) {
      this.totalePatrimoniX += +pat.book_value;
    }
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
