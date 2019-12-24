import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { SessionService, StoreService, LogErroriService, AlertService, ClientiService, LoginService, ReportService, Cliente, IconeService } from 'broker-lib';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/base.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-report-analisi',
  templateUrl: './report-analisi.page.html',
  styleUrls: ['./report-analisi.page.scss'],
})
export class ReportAnalisiPage extends BaseComponent implements OnInit {

  @ViewChild('linesCanvas', { static: false }) linesCanvas: ElementRef;
  @ViewChild('indicatoriCanvas', { static: false }) indicatoriCanvas: ElementRef;
  @ViewChild('concentrazioneCanvas', { static: false }) concentrazioneCanvas: ElementRef;
  @ViewChild('tipologiaCanvas', { static: false }) tipologiaCanvas: ElementRef;
  @ViewChild('affittuariCanvas', { static: false }) affittuariCanvas: ElementRef;

  private unsubscribe$ = new Subject<void>();

  public linesChart: any;
  public indicatoriChart: any;
  public concentrazioneChart: any;
  public tipologiaChart: any;
  public affittuariChart: any;

  constructor(public sessionService: SessionService,
    public storeService: StoreService,
    public router: Router,
    public logErroriService: LogErroriService,
    public alertService: AlertService,
    public clientiService: ClientiService,
    public loginService: LoginService,
    public reportService: ReportService,
    public iconeService: IconeService
  ) {
    super(sessionService, storeService, router, logErroriService, alertService, iconeService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ionViewDidEnter() {
    this.initializeApp();
    super.ngOnInit();
  }

  private initializeApp() {
    // ottengo il token
    this.sessionService.userDataObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(present => {
      if (present) {
        this.wsToken = this.sessionService.getUserData();

        const cliente_id = this.sessionService.getCliente().cliente_id;
        if (cliente_id === 0 || cliente_id === undefined) {
          // non ho clienti selezionati
          this.presentAlert("E' necessario selezionare un cliente");
          this.goToPage('home');
        }

        this.reportService.getGrafici(cliente_id).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(r => {
          if (r.Success) {
            const datiGraficiAndamentoAnnuale = r.Data.andamento_annuale;
            this.createLinesChart(datiGraficiAndamentoAnnuale);
            const datiGraficiIndicatori = r.Data.indicatori;
            this.createIndicatoriChart(datiGraficiIndicatori);
            const datiGraficiConcentrazione = r.Data.concentrazione;
            this.createConcentrazioneChart(datiGraficiConcentrazione);
            const datiGraficiTipologia = r.Data.tipologia;
            this.createTipologiaChart(datiGraficiTipologia);
            const datiGraficiAffittuari = r.Data.affittuari;
            this.createAffittuariChart(datiGraficiAffittuari);
          } else {
            this.manageError(r);
          }
        });
      } else {
        this.alertService.presentAlert('Token assente, necessario login');
        this.goToPage('login');
      }
    });
    this.sessionService.loadUserData();
  }

  /*
      area di creazione del grafico affittuari
    */
  private createAffittuariChart(data: any): void {
    const affittuariLabels = this.getAffittuariLabels(data);
    const valori = this.getValori(data);

    const colori = this.getColoriPieChart(data);
    this.affittuariChart = new Chart(this.affittuariCanvas.nativeElement, {
      type: 'pie',
      options: {
        aspectRatio: 1.5,
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 10,
          }
        }
      },
      data: {
        labels: affittuariLabels,
        datasets: [{
          data: valori,
          backgroundColor: colori,
          label: 'tipologia'
        }],
      }
    });
  }
  private getAffittuariLabels(data: any): Array<string> {
    const toReturn = new Array<string>();

    for (const dato of data) {
      const label = dato.descrizione_affittuario;
      toReturn.push(label);
    }

    return toReturn;
  }

  /*
    area di creazione del grafico tipologia
  */
  private createTipologiaChart(data: any): void {
    const tipologiaLabels = this.getTipologiaLabels(data);
    const valori = this.getValori(data);

    const colori = this.getColoriPieChart(data);
    this.tipologiaChart = new Chart(this.tipologiaCanvas.nativeElement, {
      type: 'pie',
      options: {
        aspectRatio: 1.5,
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 10,
          }
        }
      },
      data: {
        labels: tipologiaLabels,
        datasets: [{
          data: valori,
          backgroundColor: colori,
          label: 'tipologia'
        }],
      }
    });
  }
  private getTipologiaLabels(data: any): Array<string> {
    const toReturn = new Array<string>();

    for (const dato of data) {
      const label = dato.descrizione_tipologia;
      toReturn.push(label);
    }

    return toReturn;
  }

  /*
    area di creazione del grafico concentrazione
  */
  private createConcentrazioneChart(data: any): void {
    const concentrazioneLabels = this.getConcentrazioneLabels(data);
    const valori = this.getValori(data);

    const colori = this.getColoriPieChart(data);
    this.concentrazioneChart = new Chart(this.concentrazioneCanvas.nativeElement, {
      type: 'pie',
      options: {
        aspectRatio: 1.5,
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 10,
          }
        }
      },
      data: {
        labels: concentrazioneLabels,
        datasets: [{
          data: valori,
          backgroundColor: colori,
          label: 'indicatori'
        }],
      }
    });
  }
  private getConcentrazioneLabels(data: any): Array<string> {
    const toReturn = new Array<string>();

    for (const dato of data) {
      const label = dato.codice_catastale;
      toReturn.push(label);
    }

    return toReturn;
  }

  /*
    area di creazione del grafico degli indicatori
  */
  private createIndicatoriChart(data: any): void {

    const indicatoriLabels = this.getIndicatoriLabels(data);
    const valori = this.getIndicatoriValori(data);

    const colori = this.getColoriChart(data);

    this.indicatoriChart = new Chart(this.indicatoriCanvas.nativeElement, {
      type: 'polarArea',
      options: {
        aspectRatio: 1,
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 10,
          }
        }
      },
      data: {
        labels: indicatoriLabels,
        datasets: [{
          data: valori,
          backgroundColor: colori,
          label: 'indicatori'
        }],
      }
    });
  }
  private getIndicatoriLabels(data: any): Array<string> {
    const toReturn = new Array<string>();

    for (const dato of data) {
      const label = dato.descrizione_indicatore;
      toReturn.push(label);
    }

    return toReturn;
  }
  private getIndicatoriValori(data: any): Array<number> {
    const toReturn = new Array<number>();

    for (const dato of data) {
      const label = parseInt(dato.percentuale, 10);
      toReturn.push(label);
    }

    return toReturn;
  }
  private getColoriChart(data: any): Array<string> {
    const toReturn = new Array<string>();
    const baseColor = 'rgba(0,60,102,1)';

    for (const dato of data) {
      const percent = parseInt(dato.percentuale, 10);
      toReturn.push(this.shadeRGBAColor(baseColor, percent));
    }

    return toReturn;
  }
  private getColoriPieChart(data: any): Array<string> {
    const toReturn = new Array<string>();
    const baseColor = 'rgba(0,60,102,1)';

    const stepNumber = data.length;
    const numberArray = this.getNumberArray(stepNumber);
    const stepSize = (100 / stepNumber);

    let index = 0;
    for (const dato of data) {
      const percent = numberArray[index] * stepSize;
      toReturn.push(this.shadeRGBAColor(baseColor, percent));
      index++;
    }

    return toReturn;
  }
  private getNumberArray(size: number): Array<number> {
    const array = new Array<number>();
    for (let i = 0; i < size; i++) {
      array[i] = i;
    }
    return this.shuffle(array);
  }
  private shuffle(inputArray: Array<number>): Array<number> {

    let currentIndex = inputArray.length;
    let temporaryValue = 0;
    let randomIndex = 0;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = inputArray[currentIndex];
      inputArray[currentIndex] = inputArray[randomIndex];
      inputArray[randomIndex] = temporaryValue;
    }

    return inputArray;
  }
  private shadeRGBAColor(color: string, percent: number) { // percentuale con numeri da 0 a 100
    const f = color.split(",");
    const t = 255;
    const R = parseInt(f[0].slice(5), 10);
    const G = parseInt(f[1], 10);
    const B = parseInt(f[2], 10);
    return "rgba(" + (Math.round((t - R) * (percent / 100)) + R) + ","
      + (Math.round((t - G) * (percent / 100)) + G) + ","
      + (Math.round((t - B) * (percent / 100)) + B) + ",1)";
  }

  /*
    area di creazione del grafico dell'andamento annuale
  */
  private createLinesChart(data: any) {

    const analisiLabels = this.getAndamentoAnnualeLabels(data);
    const attivi = this.getAndamentoAnnualeAttivo(data);
    const passivi = this.getAndamentoAnnualePassivo(data);

    this.linesChart = new Chart(this.linesCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: analisiLabels,
        datasets: [
          {
            data: attivi,
            label: 'attivi',
            borderColor: "#3e95cd",
            fill: false
          },
          {
            data: passivi,
            label: 'passivi',
            borderColor: "#8e5ea2",
            fill: false
          },
        ]
      },
      options: {
        aspectRatio: 3,
        title: {
          display: true,
          text: 'Analisi'
        }
      }
    });
  }

  private getAndamentoAnnualeLabels(data: any): Array<string> {
    const toReturn = new Array<string>();

    for (const dato of data) {
      const label = dato.anno;
      toReturn.push(label);
    }

    return toReturn;
  }

  private getAndamentoAnnualeAttivo(data: any): Array<number> {
    const toReturn = new Array<number>();

    for (const dato of data) {
      const label = +dato.attivo;
      toReturn.push(label);
    }

    return toReturn;
  }

  private getAndamentoAnnualePassivo(data: any): Array<number> {
    const toReturn = new Array<number>();

    for (const dato of data) {
      const label = +dato.passivo;
      toReturn.push(label);
    }

    return toReturn;
  }

  /*
    parte comune grafici
  */
  private getValori(data: any): Array<number> {
    const toReturn = new Array<number>();

    for (const dato of data) {
      const label = parseInt(dato.percentuale, 10);
      toReturn.push(label);
    }

    return toReturn;
  }

  public goToReportGenerale(): void {
    this.goToPage('report-generale');
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
