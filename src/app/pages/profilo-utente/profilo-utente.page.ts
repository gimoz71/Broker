import { Component, OnInit, NgZone } from '@angular/core';
import { CambioPasswordRequest, SessionService, StoreService, LogErroriService, AlertService, ClientiService, LoginService, IconeService } from 'broker-lib';
import { BaseComponent } from 'src/app/component/base.component';
import { Router } from '@angular/router';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profilo-utente',
  templateUrl: './profilo-utente.page.html',
  styleUrls: ['./profilo-utente.page.scss'],
})
export class ProfiloUtentePage extends BaseComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  public cambioPasswordRequest: CambioPasswordRequest;

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
    public logoutComm: LogoutCommunicationService
  ) {
    super(sessionService, storeService, router, logErroriService, alertService, iconeService, ngZone);
    this.cambioPasswordRequest = new CambioPasswordRequest();
    this.cambioPasswordRequest.nuova_password = '';
    this.cambioPasswordRequest.vecchia_password = '';
    this.cambioPasswordRequest.ripeti_password = '';
  }

  ngOnInit() {
    super.ngOnInit();

    this.logoutComm.logoutObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
      this.ngZone.run(() => this.router.navigate(['login'])).then();
    });
  }

  public salvaNuovaPassword(): void {
    // validazione
    if (!this.validaPassword()) {
      this.alertService.presentAlert("Password non valida, i requisiti sono:<br/>" +
        "- deve contenere almeno un numero.<br/>" +
        "- deve contenere almeno una lettera minuscola.<br/>" +
        "- deve contenere almeno una lettera maiuscola<br/>" +
        "- deve contenere almeno un carattere speciale (@#$%^&+=)<br/>" +
        "- non deve contenere spazi bianchi<br/>" +
        "- deve essere lunga almeno 8 caratteri<br/>");
      return;
    }

    this.loginService.CambioPassword(this.cambioPasswordRequest).subscribe(r => {
      if (r.Success) {
        this.alertService.presentAlert("Password correttamente modificata");
        this.cambioPasswordRequest = new CambioPasswordRequest();
        this.goToPage("home");
      } else {
        this.manageError(r);
      }
    },
      (error) => {
        this.manageHttpError(error);
      });
  }

  public validaPassword(): boolean {
    let valid = true;
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{8,})");
    if (!strongRegex.test(this.cambioPasswordRequest.nuova_password)) {
      valid = false;
    }
    return valid;
  }

  public isAlertStatus(): boolean {
    return this.cambioPasswordRequest.ripeti_password.length > 0
      && (this.arePasswordDifferent()
        || this.isOldPassworEqualToNew());
  }

  public arePasswordDifferent(): boolean {
    return this.cambioPasswordRequest.nuova_password !== this.cambioPasswordRequest.ripeti_password;
  }

  public isOldPassworEqualToNew(): boolean {
    return this.cambioPasswordRequest.vecchia_password === this.cambioPasswordRequest.nuova_password;
  }
}
