import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, Platform } from '@ionic/angular';

import { AmmortamentoPage } from './ammortamento.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ImmobiliService, ClientiService } from 'broker-lib';

const routes: Routes = [
  {
    path: '',
    component: AmmortamentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: AmmortamentoPage
      }
    ]),
    PipesModule
  ],
  declarations: [AmmortamentoPage],
  providers: [ImmobiliService,
    ClientiService,
    Platform]
})
export class AmmortamentoPageModule { }
