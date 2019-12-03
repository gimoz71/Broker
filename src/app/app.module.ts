import { SchedaImmobilePageModule } from './pages/scheda-immobile/scheda-immobile.module';
// import { ErrorHandlerService } from './../../projects/broker-lib/src/lib/services/error-handler/error-handler.service';
import { ErrorHandlerService, RaDatePipe } from 'broker-lib';
import { SessionService, StoreService, LoginService } from 'broker-lib';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

import { BrokerLibModule } from 'broker-lib';

import { HomePage } from './pages/home/home.page';
import { HomePageModule } from './pages/home/home.module';

import { FormsModule } from '@angular/forms';
import { LoginPageModule } from './pages/login/login.module';
import { WizardPageModule } from './pages/wizard/wizard.module';
import { ReportGeneralePageModule } from './pages/report-generale/report-generale.module';
import { ReportAnalisiPageModule } from './pages/report-analisi/report-analisi.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MyDatePicker } from './component/datepicker/mydatepicker.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'wizard', loadChildren: () => import('./pages/wizard/wizard.module').then(m => m.WizardPageModule) },
  { path: 'scheda-immobile', loadChildren: () => import('./pages/scheda-immobile/scheda-immobile.module').then(m => m.SchedaImmobilePageModule) },
  // { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  // { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  // { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  // { path: 'scheda-immobile', loadChildren: './pages/scheda-immobile/scheda-immobile.module#SchedaImmobilePageModule' },
  // { path: 'report', loadChildren: './pages/report/report.module#ReportPageModule' },
  // { path: 'analisi', loadChildren: './pages/analisi/analisi.module#AnalisiPageModule' },
  // { path: 'nuovo-cliente', loadChildren: './pages/nuovo-cliente/nuovo-cliente.module#NuovoClientePageModule' },
  // { path: 'scheda-cliente', loadChildren: './pages/scheda-cliente/scheda-cliente.module#SchedaClientePageModule' },
  // { path: 'patrimonio', loadChildren: './pages/patrimonio/patrimonio.module#PatrimonioPageModule' },
  // { path: 'catastali', loadChildren: './pages/catastali/catastali.module#CatastaliPageModule' },
  { path: 'report-generale', loadChildren: () => import('./pages/report-generale/report-generale.module').then(m => m.ReportGeneralePageModule) },
  { path: 'report-analisi', loadChildren: () => import('./pages/report-analisi/report-analisi.module').then(m => m.ReportAnalisiPageModule) },
  // { path: 'report-analisi', loadChildren: './pages/report-analisi/report-analisi.module#ReportAnalisiPageModule' },
  // { path: 'ammortamento', loadChildren: './pages/ammortamento/ammortamento.module#AmmortamentoPageModule' },
  // { path: 'client-home', loadChildren: './pages/client-home/client-home.module#ClientHomePageModule' },

];

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    BrokerLibModule,
    FormsModule,
    HomePageModule,
    LoginPageModule,
    WizardPageModule,
    ReportGeneralePageModule,
    ReportAnalisiPageModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [
    // ErrorHandlerService,
    // { provide: ErrorHandler, useClass: ErrorHandlerService },
    SessionService,
    StoreService,
    LoginService,
    StatusBar,
    SplashScreen,
    RaDatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
