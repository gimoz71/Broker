import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WizardPage } from './wizard.page';
import { AlertService } from 'broker-lib';
import { IgxDatePickerModule } from 'igniteui-angular';
import { MyDatePickerModule } from 'src/app/component/datepicker/mydatepicker.module';
import { OnlyDigitsDirective } from 'src/app/directive/onlydigits.directive';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgxSelectModule } from 'ngx-select-ex';

const routes: Routes = [
  {
    path: '',
    component: WizardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IgxDatePickerModule,
    MyDatePickerModule,
    PipesModule,
    ReactiveFormsModule,
    NgxSelectModule
  ],
  declarations: [WizardPage,
    OnlyDigitsDirective],
  providers: [AlertService]
})
export class WizardPageModule { }
