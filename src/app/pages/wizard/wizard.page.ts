import { Component, OnInit } from '@angular/core';
import { ImmobileDettaglio, ImmobiliService, AlertService, LogErroriService, WsLogErrore } from 'broker-lib';
import { Router } from '@angular/router';


@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.page.html',
  styleUrls: ['./wizard.page.scss'],
})
export class WizardPage implements OnInit {

  public immobile: ImmobileDettaglio;

  public wizardStart: boolean;
  public wizardDestinazione: boolean;
  public wizardDatiDestinazione: boolean;
  public wizardDati: boolean;
  public wizardCatastali: boolean;
  public wizardTassazione: boolean;

  constructor(
    private immobiliService: ImmobiliService,
    private router: Router,
    private alertService: AlertService,
    private logErroriService: LogErroriService
  ) {
    this.wizardStart = true;
    this.wizardDestinazione = false;
    this.wizardDatiDestinazione = false;
    this.wizardDati = false;
    this.wizardCatastali = false;
    this.wizardTassazione = false;
  }

  public goToDestinazione(): void {
    this.wizardStart = false;
    this.wizardDestinazione = true;
    this.wizardDatiDestinazione = false;
    this.wizardDati = false;
    this.wizardCatastali = false;
    this.wizardTassazione = false;
  }

  public goToDatiDestinazione(): void {
    this.wizardStart = false;
    this.wizardDestinazione = false;
    this.wizardDatiDestinazione = true;
    this.wizardDati = false;
    this.wizardCatastali = false;
    this.wizardTassazione = false;
  }

  public goToDati(): void {
    this.wizardStart = false;
    this.wizardDestinazione = false;
    this.wizardDatiDestinazione = false;
    this.wizardDati = true;
    this.wizardCatastali = false;
    this.wizardTassazione = false;
  }

  public goToCatastali(): void {
    this.wizardStart = false;
    this.wizardDestinazione = false;
    this.wizardDatiDestinazione = false;
    this.wizardDati = false;
    this.wizardCatastali = true;
    this.wizardTassazione = false;
  }

  public goToTassazione(): void {
    this.wizardStart = false;
    this.wizardDestinazione = false;
    this.wizardDatiDestinazione = false;
    this.wizardDati = false;
    this.wizardCatastali = false;
    this.wizardTassazione = true;
  }

  public goToStart(): void {
    this.wizardStart = true;
    this.wizardDestinazione = false;
    this.wizardDatiDestinazione = false;
    this.wizardDati = false;
    this.wizardCatastali = false;
    this.wizardTassazione = false;
  }

  public salvaImmobile(): void {
    this.immobiliService.putImmobile(this.immobile, '').subscribe(r => {
      if (r.Success) {
        // salvataggio andato a buon fine. Riporto alla home (?)
        this.router.navigate(['home']);
      } else {
        var wsErrore: WsLogErrore = new WsLogErrore();

        this.logErroriService.postErrore(null, '');
        this.alertService.presentErrorAlert("Si è verificato un errore nel salvataggio dell'immobile: " + r.ErrorMessage.msg_testo);
      }
    });
  }

  ngOnInit() {
  }

}
