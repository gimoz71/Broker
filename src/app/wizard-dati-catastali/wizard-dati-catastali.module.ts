import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WizardDatiCatastaliPage } from './wizard-dati-catastali.page';

const routes: Routes = [
  {
    path: '',
    component: WizardDatiCatastaliPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WizardDatiCatastaliPage]
})
export class WizardDatiCatastaliPageModule {}
