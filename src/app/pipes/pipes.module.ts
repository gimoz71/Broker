import { NgModule } from '@angular/core';
import { ClientFilterPipe } from './namefilter.pipe';
import { RaDatePipe } from './date.pipe';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [IonicModule],
    declarations: [ClientFilterPipe, RaDatePipe],
    exports: [ClientFilterPipe, RaDatePipe],
})

export class PipesModule {

    static forRoot() {
        return {
            ngModule: PipesModule,
            providers: [],
        };
    }
}
