import { Component, OnInit } from '@angular/core';
import { CambioPasswordRequest, SessionService, StoreService, LogErroriService, AlertService, ClientiService, LoginService } from 'broker-lib';
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
    public loginService: LoginService
  ) {
    super(sessionService, storeService, router, logErroriService, alertService);
    this.cambioPasswordRequest = new CambioPasswordRequest();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public salvaNuovaPassword(): void {
    // validazione
    this.loginService.CambioPassword(this.cambioPasswordRequest, this.wsToken.token_value).subscribe(r => {
      if (r.Success) {
        this.alertService.presentAlert("Password correttamente modificata");
        this.cambioPasswordRequest = new CambioPasswordRequest();
        this.goToPage("home");
      } else {
        this.manageError(r);
      }
    });
  }
}
