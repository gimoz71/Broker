import { Component, OnInit } from '@angular/core';
import { CambioPasswordRequest, SessionService, StoreService, LogErroriService, AlertService, ClientiService, LoginService, IconeService } from 'broker-lib';
import { BaseComponent } from 'src/app/component/base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilo-utente',
  templateUrl: './profilo-utente.page.html',
  styleUrls: ['./profilo-utente.page.scss'],
})
export class ProfiloUtentePage extends BaseComponent implements OnInit {

  public cambioPasswordRequest: CambioPasswordRequest;

  constructor(
    public sessionService: SessionService,
    public storeService: StoreService,
    public router: Router,
    public logErroriService: LogErroriService,
    public alertService: AlertService,
    public clientiService: ClientiService,
    public loginService: LoginService,
    public iconeService: IconeService
  ) {
    super(sessionService, storeService, router, logErroriService, alertService, iconeService);
    this.cambioPasswordRequest = new CambioPasswordRequest();
  }

  ngOnInit() {
    super.ngOnInit();
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
}
