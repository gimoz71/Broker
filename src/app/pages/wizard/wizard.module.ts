import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WizardPage } from './wizard.page';
import { AlertService } from 'broker-lib';
import { IgxDatePickerModule } from 'igniteui-angular';
import { MyDatePicker } from 'src/app/component/datepicker/mydatepicker.component';
import { MyDatePickerModule } from 'src/app/component/datepicker/mydatepicker.module';



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
    MyDatePickerModule
  ],
  declarations: [WizardPage],
  providers: [AlertService]
})
export class WizardPageModule { }
