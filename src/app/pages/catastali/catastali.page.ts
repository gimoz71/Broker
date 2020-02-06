import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { SessionService, StoreService, LogErroriService, AlertService, ClientiService, LoginService, ReportService, Cliente, IconeService, ImmobileDettaglio, ImmobiliService } from 'broker-lib';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/base.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'app-catastali',
  templateUrl: './catastali.page.html',
  styleUrls: ['./catastali.page.scss'],
})
export class CatastaliPage extends BaseComponent implements OnInit {

  public immobile: ImmobileDettaglio;

  constructor(public sessionService: SessionService,
    public storeService: StoreService,
    public router: Router,
    public logErroriService: LogErroriService,
    public alertService: AlertService,
    public clientiService: ClientiService,
    public loginService: LoginService,
    public reportService: ReportService,
    public iconeService: IconeService,
    public immobiliService: ImmobiliService
  ) {
    super(sessionService, storeService, router, logErroriService, alertService, iconeService);
    this.immobile = this.sessionService.getImmobileDettaglio();
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    super.ngOnInit();
    this.immobile = this.sessionService.getImmobileDettaglio();
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
