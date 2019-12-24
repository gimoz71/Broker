import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/component/base.component';
import { SessionService, StoreService, LogErroriService, AlertService, InserimentoClienteRequest, ClientiService, IconeService } from 'broker-lib';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nuovo-cliente',
  templateUrl: './nuovo-cliente.page.html',
  styleUrls: ['./nuovo-cliente.page.scss'],
})
export class NuovoClientePage extends BaseComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

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
    this.clientiService.putCliente(this.nuovoCliente).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if (r.Success) {
        this.alertService.presentAlert("Nuovo cliente inviato correttamente");
        this.nuovoCliente = new InserimentoClienteRequest();
        this.goToPage("home");
      } else {
        this.manageError(r);
      }
    });
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
