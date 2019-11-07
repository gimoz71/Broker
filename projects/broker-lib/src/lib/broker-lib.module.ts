import { ErrorHandlerService } from './handler/error/error-handler.service';
import { LogErroriService } from './services/log-errori/log-errori.service';
import { NgModule } from '@angular/core';

import { ConstantsService } from './services/common/constants.service';
import { BrokerHttpService } from './services/common/brokerhttp.service';
import { ImmobiliService } from './services/immobili/immobili.service';
import { ClientiService } from './services/clienti/clienti.service';

import { HttpClientModule } from '@angular/common/http';
import { DropdownService } from './services/dropdown/dropdown.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    ConstantsService,
    BrokerHttpService,
    ImmobiliService,
    ClientiService,
    DropdownService,
    LogErroriService,
    ErrorHandlerService,
  ],
  exports: [
  ]
})
export class BrokerLibModule { }
