import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Chart } from 'chart.js';
import { SessionService, StoreService, LogErroriService, AlertService, ClientiService, LoginService, ReportService, Cliente, IconeService, ImmobileDettaglio, ImmobiliService } from 'broker-lib';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/base.component';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-catastali',
  templateUrl: './catastali.page.html',
  styleUrls: ['./catastali.page.scss'],
})
export class CatastaliPage extends BaseComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  public immobile: ImmobileDettaglio;

  constructor(
    public sessionService: SessionService,
    public storeService: StoreService,
    public router: Router,
    public logErroriService: LogErroriService,
    public alertService: AlertService,
    public clientiService: ClientiService,
    public loginService: LoginService,
    public reportService: ReportService,
    public iconeService: IconeService,
    public immobiliService: ImmobiliService,
    public ngZone: NgZone,
    public logoutComm: LogoutCommunicationService
  ) {
    super(sessionService, storeService, router, logErroriService, alertService, iconeService, ngZone);
    this.immobile = this.sessionService.getImmobileDettaglio();
  }

  ngOnInit() {
  }

  private initializeApp() {

    this.logoutComm.logoutObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      this.ngZone.run(() => this.router.navigate(['login'])).then();
    });
  }

  ionViewDidEnter() {
    super.ngOnInit();
    this.immobile = this.sessionService.getImmobileDettaglio();
    this.initializeApp();
  }

  public apriSchedaImmobile(immobile: number) {
    this.goToPageParams('scheda-immobile', { queryParams: { immobile_id: immobile } });
  }

  public generatePdfCatasto(): void {
    this.immobiliService.invioDatiCatastali(this.immobile.proprieta_id).subscribe(r => {
      if (r.Success) {
        this.alertService.presentAlert('Riepilogo PDF inviato correttamente');
      } else {
        this.manageError(r);
      }
    },
      (error) => {
        this.manageHttpError(error);
      });
  }

}
