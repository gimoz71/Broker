import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/component/base.component';
import { SessionService, StoreService, LogErroriService, AlertService, ClientiService, LoginService, BookValue, Immobile } from 'broker-lib';
import { Router } from '@angular/router';
import { Cliente } from 'projects/broker-lib/src/public-api';

@Component({
  selector: 'app-patrimonio',
  templateUrl: './patrimonio.page.html',
  styleUrls: ['./patrimonio.page.scss'],
})
export class PatrimonioPage extends BaseComponent implements OnInit {

  public patrimoniA: Array<BookValue>;
  public patrimoniC: Array<BookValue>;
  public patrimoniT: Array<BookValue>;

  public cliente: Cliente;
  public immobiliCliente: Array<Immobile>;

  public totalePatrimoniA: number;
  public totalePatrimoniC: number;
  public totalePatrimoniT: number;

  constructor(public sessionService: SessionService,
    public storeService: StoreService,
    public router: Router,
    public logErroriService: LogErroriService,
    public alertService: AlertService,
    public clientiService: ClientiService,
    public loginService: LoginService
  ) {
    super(sessionService, storeService, router, logErroriService, alertService);
    this.patrimoniA = new Array<BookValue>();
    this.patrimoniC = new Array<BookValue>();
    this.patrimoniT = new Array<BookValue>();
    this.totalePatrimoniA = 0;
    this.totalePatrimoniC = 0;
    this.totalePatrimoniT = 0;
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadCliente();

    // carico i patrimoni del cliente selezionato
    this.cliente = this.getCliente();
    if (this.cliente.cliente_id === 0 || this.cliente.cliente_id === undefined) {
      // non ho clienti selezionati
      this.presentAlert("E' necessario selezionare un cliente");
      this.goToPage('home');
    }
    this.immobiliCliente = this.sessionService.getImmobiliCliente();
    this.clientiService.getBookValue(this.cliente.cliente_id, this.sessionService.getUserData().token_value).subscribe(r => {
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
  }

  public apriSchedaImmobile(immobile: number) {
    // this.router.navigate(['scheda-immobile'], { queryParams: { immobile_id: immobile } });
    this.goToPageParams('scheda-immobile', { queryParams: { immobile_id: immobile } });
  }

  public calcolaTotalePatrimoniA(): void {
    for (let pat of this.patrimoniA) {
      this.totalePatrimoniA += +pat.book_value;
    }
  }

  public calcolaTotalePatrimoniC(): void {
    for (let pat of this.patrimoniC) {
      this.totalePatrimoniA += +pat.book_value;
    }
  }

  public calcolaTotalePatrimoniT(): void {
    for (let pat of this.patrimoniT) {
      this.totalePatrimoniA += +pat.book_value;
    }
  }
}
