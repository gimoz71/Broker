import { Component, OnInit } from '@angular/core';
import { SessionService, StoreService, LogErroriService, AlertService, ClientiService, LoginService, ReportService, Cliente, ReportGenerale } from 'broker-lib';
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
}
