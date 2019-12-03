import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/component/base.component';
import { SessionService, StoreService, LogErroriService, AlertService } from 'broker-lib';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nuovo-cliente',
  templateUrl: './nuovo-cliente.page.html',
  styleUrls: ['./nuovo-cliente.page.scss'],
})
export class NuovoClientePage extends BaseComponent implements OnInit {

  public nome: string;
  public cognome: string;
  public codicefiscale: string;

  constructor(
    public sessionService: SessionService,
    public storeService: StoreService,
    public router: Router,
    public logErroriService: LogErroriService,
    public alertService: AlertService
  ) {
    super(sessionService, storeService, router, logErroriService, alertService);
    this.nome = '';
    this.cognome = '';
    this.codicefiscale = '';
  }

  ngOnInit() {
  }

}
