
import { SessionService, StoreService, LoginService, ReportService, IconeService } from 'broker-lib';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

import { BrokerLibModule } from 'broker-lib';

import { HomePage } from './pages/home/home.page';
import { HomePageModule } from './pages/home/home.module';
import { ProfiloUtentePageModule } from './pages/profilo-utente/profilo-utente.module';

import { FormsModule } from '@angular/forms';
import { LoginPageModule } from './pages/login/login.module';
import { WizardPageModule } from './pages/wizard/wizard.module';
import { ReportGeneralePageModule } from './pages/report-generale/report-generale.module';
import { ReportAnalisiPageModule } from './pages/report-analisi/report-analisi.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RaHttpInterceptor } from './interceptor/http.interceptor';
import { NuovoClientePageModule } from './pages/nuovo-cliente/nuovo-cliente.module';
import { SchedaImmobilePageModule } from './pages/scheda-immobile/scheda-immobile.module';
import { PipesModule } from './pipes/pipes.module';
import { AmmortamentoPageModule } from './pages/ammortamento/ammortamento.module';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'profilo-utente', loadChildren: () => import('./pages/profilo-utente/profilo-utente.module').then(m => m.ProfiloUtentePageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'wizard', loadChildren: () => import('./pages/wizard/wizard.module').then(m => m.WizardPageModule) },
  { path: 'scheda-immobile', loadChildren: () => import('./pages/scheda-immobile/scheda-immobile.module').then(m => m.SchedaImmobilePageModule) },
  { path: 'nuovo-cliente', loadChildren: () => import('./pages/nuovo-cliente/nuovo-cliente.module').then(m => m.NuovoClientePageModule) },
  // { path: 'scheda-cliente', loadChildren: './pages/scheda-cliente/scheda-cliente.module#SchedaClientePageModule' },
  { path: 'patrimonio', loadChildren: () => import('./pages/patrimonio/patrimonio.module').then(m => m.PatrimonioPageModule) },
  // { path: 'catastali', loadChildren: './pages/catastali/catastali.module#CatastaliPageModule' },
  { path: 'report-generale', loadChildren: () => import('./pages/report-generale/report-generale.module').then(m => m.ReportGeneralePageModule) },
  { path: 'report-analisi', loadChildren: () => import('./pages/report-analisi/report-analisi.module').then(m => m.ReportAnalisiPageModule) },
  { path: 'ammortamento', loadChildren: () => import('./pages/ammortamento/ammortamento.module').then(m => m.AmmortamentoPageModule) },
];

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    BrokerLibModule.forRoot(),
    FormsModule,
    HomePageModule,
    ProfiloUtentePageModule,
    LoginPageModule,
    WizardPageModule,
    ReportGeneralePageModule,
    ReportAnalisiPageModule,
    NuovoClientePageModule,
    SchedaImmobilePageModule,
    AmmortamentoPageModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    PipesModule,
    IonicModule.forRoot()
  ],
  providers: [
    // ErrorHandlerService,
    // { provide: ErrorHandler, useClass: ErrorHandlerService },
    SessionService,
    StoreService,
    LoginService,
    IconeService,
    StatusBar,
    ReportService,
    SplashScreen,
    HTTP,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RaHttpInterceptor,
      multi: true
    }
  ],
  exports: [
    PipesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
