import { NgModule } from '@angular/core';

import { ConstantsService } from './services/common/constants.service';
import { BrokerHttpService } from './services/common/brokerhttp.service';
import { ImmobiliService } from './services/immobili/immobili.service';
import { ClientiService } from './services/clienti/clienti.service';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    ConstantsService,
    BrokerHttpService,
    ImmobiliService,
    ClientiService
  ],
  exports: [
  ]
})
export class BrokerLibModule { }
