import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.page.html',
  styleUrls: ['./wizard.page.scss'],
})
export class WizardPage implements OnInit {

  public wizardStart: boolean;
  public wizardDestinazione: boolean;
  public wizardDatiDestinazione: boolean;
  public wizardDati: boolean;
  public wizardCatastali: boolean;
  public wizardTassazione: boolean;

  constructor() {
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

  ngOnInit() {
  }

}
