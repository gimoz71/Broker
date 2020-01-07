import { NgModule } from '@angular/core';
import { ClientFilterPipe } from './namefilter.pipe';
import { RaDatePipe } from './date.pipe';
import { IonicModule } from '@ionic/angular';
import { RaMoneyPipe } from './money.pipe';

@NgModule({
    imports: [IonicModule],
    declarations: [ClientFilterPipe, RaDatePipe, RaMoneyPipe],
    exports: [ClientFilterPipe, RaDatePipe, RaMoneyPipe],
})

export class PipesModule {

    static forRoot() {
        return {
            ngModule: PipesModule,
            providers: [],
        };
    }
}
