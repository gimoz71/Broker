import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WizardDatiDataPage } from './wizard-dati-data.page';

const routes: Routes = [
  {
    path: '',
    component: WizardDatiDataPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WizardDatiDataPage]
})
export class WizardDatiDataPageModule {}
