import { Component, OnInit, NgZone } from '@angular/core';
import { BaseComponent } from 'src/app/component/base.component';
import { SessionService, StoreService, LogErroriService, AlertService, InserimentoClienteRequest, ClientiService, IconeService, AbilitaAppClienteRequest } from 'broker-lib';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';

@Component({
  selector: 'app-nuovo-cliente',
  templateUrl: './nuovo-cliente.page.html',
  styleUrls: ['./nuovo-cliente.page.scss'],
})
export class NuovoClientePage extends BaseComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  public nuovoCliente: InserimentoClienteRequest;
  public passwordAbilitazione: string;

  public nuovo: boolean;
  public abilitato: boolean;

  constructor(
    public sessionService: SessionService,
    public storeService: StoreService,
    public router: Router,
    public logErroriService: LogErroriService,
    public alertService: AlertService,
    public clientiService: ClientiService,
    public iconeService: IconeService,
    public ngZone: NgZone,
    public logoutComm: LogoutCommunicationService
  ) {
    super(sessionService, storeService, router, logErroriService, alertService, iconeService, ngZone);
    this.nuovoCliente = new InserimentoClienteRequest();
    this.nuovo = true;
    this.abilitato = false;
    this.passwordAbilitazione = '';
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ionViewDidEnter() {
    this.initializeApp();
  }

  private initializeApp(): void {


    this.logoutComm.logoutObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
      this.ngZone.run(() => this.router.navigate(['login'])).then();
    });

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

  public loadPageData(): void {
    const cliente_id = this.sessionService.getCliente().cliente_id;
    if (cliente_id !== 0 && cliente_id !== undefined) {
      this.nuovoCliente.codice_fiscale = this.sessionService.getCliente().codice_fiscale;
      this.nuovoCliente.nome = this.sessionService.getCliente().nome;
      this.nuovoCliente.cognome = this.sessionService.getCliente().cognome;
      this.nuovoCliente.email = this.sessionService.getCliente().email;
      this.nuovoCliente.cliente_id = this.sessionService.getCliente().cliente_id;
      this.abilitato = (this.sessionService.getCliente().stato_cliente === 'A' || this.sessionService.getCliente().stato_cliente === 'P');
      this.nuovo = false;
    }
  }

  public logout(): void {
    this.sessionService.clearUserData();
    this.logoutComm.comunicateLogout();
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
    },
      (error) => {
        this.manageHttpError(error);
      });
  }

  public abilitaApp(): void {
    const abilitaAppRequest: AbilitaAppClienteRequest = new AbilitaAppClienteRequest();
    abilitaAppRequest.cliente_id = this.sessionService.getCliente().cliente_id;
    abilitaAppRequest.password = this.passwordAbilitazione;
    this.clientiService.abilitaAppCliente(abilitaAppRequest).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if (r.Success) {
        this.alertService.presentAlert("Richiesta di abilitazione correttamente trasmessa");
        this.goToHome();
      } else {
        this.manageError(r);
      }
    },
      (error) => {
        this.manageHttpError(error);
      });
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
