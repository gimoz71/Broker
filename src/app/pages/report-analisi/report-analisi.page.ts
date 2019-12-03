import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/dist/Chart';

@Component({
  selector: 'app-report-analisi',
  templateUrl: './report-analisi.page.html',
  styleUrls: ['./report-analisi.page.scss'],
})
export class ReportAnalisiPage implements OnInit {

  @ViewChild('linesCanvas', { static: false }) linesCanvas;

  linesChart: any;

  constructor() { }

  ngOnInit() {
  }

  private createLinesChart() {
    const data: any = null;
    const options: any = null;
    this.linesChart = new Chart(this.linesCanvas.nativeElement, {
      type: 'line',
      data: { data },
      options: { options }
    });
  }
}
