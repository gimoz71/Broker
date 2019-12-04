import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WizardPage } from './wizard.page';
import { AlertService } from 'broker-lib';
import { IgxDatePickerModule } from 'igniteui-angular';
import { MyDatePickerModule } from 'src/app/component/datepicker/mydatepicker.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { RaDatePipe } from 'src/app/pipes/date.pipe';
import { OnlyDigitsDirective } from 'src/app/directive/onlydigits.directive';



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
    PipesModule.forRoot()
  ],
  declarations: [WizardPage,
    OnlyDigitsDirective],
  providers: [AlertService,
    RaDatePipe]
})
export class WizardPageModule { }
