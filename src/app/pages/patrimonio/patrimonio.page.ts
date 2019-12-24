import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/component/base.component';
import { SessionService, StoreService, LogErroriService, AlertService, ClientiService, LoginService, BookValue, Immobile, IconeService } from 'broker-lib';
import { Router } from '@angular/router';
import { Cliente } from 'projects/broker-lib/src/public-api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  public totalePatrimoniA: number;
  public totalePatrimoniC: number;
  public totalePatrimoniT: number;

  constructor(public sessionService: SessionService,
    public storeService: StoreService,
    public router: Router,
    public logErroriService: LogErroriService,
    public alertService: AlertService,
    public clientiService: ClientiService,
    public loginService: LoginService,
    public iconeService: IconeService
  ) {
    super(sessionService, storeService, router, logErroriService, alertService, iconeService);
    this.patrimoniA = new Array<BookValue>();
    this.patrimoniC = new Array<BookValue>();
    this.patrimoniT = new Array<BookValue>();
    this.totalePatrimoniA = 0;
    this.totalePatrimoniC = 0;
    this.totalePatrimoniT = 0;
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

        this.clientiService.getBookValue(cliente_id).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(r => {
          if (r.Success) {
            if (r.Data.elencoTipologieCatastaliA) {
              this.patrimoniA = r.Data.elencoTipologieCatastaliA;
              this.calcolaTotalePatrimoniA();
            }
            if (r.Data.elencoTipologieCatastaliC) {
              this.patrimoniA = r.Data.elencoTipologieCatastaliC;
              this.calcolaTotalePatrimoniC();
            }
            if (r.Data.elencoTipologieCatastaliT) {
              this.patrimoniA = r.Data.elencoTipologieCatastaliT;
              this.calcolaTotalePatrimoniT();
            }
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
      this.totalePatrimoniA += +pat.book_value;
    }
  }

  public calcolaTotalePatrimoniT(): void {
    for (const pat of this.patrimoniT) {
      this.totalePatrimoniA += +pat.book_value;
    }
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
