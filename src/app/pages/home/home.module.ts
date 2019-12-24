import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ImmobiliService } from 'broker-lib';
import { ClientiService } from 'broker-lib';

import { Platform } from 'ionic-angular';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ]),
        PipesModule
    ],
    declarations: [HomePage],
    providers: [ImmobiliService,
        ClientiService,
        Platform]
})
export class HomePageModule { }
