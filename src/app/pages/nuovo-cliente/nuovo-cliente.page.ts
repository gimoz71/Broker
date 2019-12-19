import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/component/base.component';
import { SessionService, StoreService, LogErroriService, AlertService, InserimentoClienteRequest, ClientiService, IconeService } from 'broker-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuovo-cliente',
  templateUrl: './nuovo-cliente.page.html',
  styleUrls: ['./nuovo-cliente.page.scss'],
})
export class NuovoClientePage extends BaseComponent implements OnInit {

  public nuovoCliente: InserimentoClienteRequest;

  constructor(
    public sessionService: SessionService,
    public storeService: StoreService,
    public router: Router,
    public logErroriService: LogErroriService,
    public alertService: AlertService,
    public clientiService: ClientiService,
    public iconeService: IconeService
  ) {
    super(sessionService, storeService, router, logErroriService, alertService, iconeService);
    this.nuovoCliente = new InserimentoClienteRequest();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public goToHome() {
    this.goToPage('home');
  }

  public saveNewCliente(): void {
    this.nuovoCliente.promotore_id = this.wsToken.utente.utente_id;
    this.clientiService.putCliente(this.nuovoCliente, this.wsToken.token_value).subscribe(r => {
      if (r.Success) {
        this.alertService.presentAlert("Nuovo cliente inviato correttamente");
        this.nuovoCliente = new InserimentoClienteRequest();
        this.goToPage("home");
      } else {
        this.manageError(r);
      }
    });
  }
}
