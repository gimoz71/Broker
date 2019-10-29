import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReportAnalisiPage } from './report-analisi.page';

const routes: Routes = [
  {
    path: '',
    component: ReportAnalisiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReportAnalisiPage]
})
export class ReportAnalisiPageModule {}
