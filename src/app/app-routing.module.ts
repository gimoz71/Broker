import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
    { path: 'profilo-utente', loadChildren: () => import('./pages/profilo-utente/profilo-utente.module').then(m => m.ProfiloUtentePageModule) },

    // { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
    // { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
    // { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
    // { path: 'scheda-immobile', loadChildren: './pages/scheda-immobile/scheda-immobile.module#SchedaImmobilePageModule' },
    // { path: 'report', loadChildren: './pages/report/report.module#ReportPageModule' },
    // { path: 'analisi', loadChildren: './pages/analisi/analisi.module#AnalisiPageModule' },
    // { path: 'nuovo-cliente', loadChildren: './pages/nuovo-cliente/nuovo-cliente.module#NuovoClientePageModule' },
    // { path: 'scheda-cliente', loadChildren: './pages/scheda-cliente/scheda-cliente.module#SchedaClientePageModule' },
    // { path: 'wizard', loadChildren: './pages/wizard/wizard.module#WizardPageModule' },
    // { path: 'patrimonio', loadChildren: './pages/patrimonio/patrimonio.module#PatrimonioPageModule' },
    // { path: 'catastali', loadChildren: './pages/catastali/catastali.module#CatastaliPageModule' },
    // { path: 'report-generale', loadChildren: './pages/report-generale/report-generale.module#ReportGeneralePageModule' },
    // { path: 'report-analisi', loadChildren: './pages/report-analisi/report-analisi.module#ReportAnalisiPageModule' },
    // { path: 'ammortamento', loadChildren: './pages/ammortamento/ammortamento.module#AmmortamentoPageModule' },
    // { path: 'wizard-destinazione', loadChildren: './pages/wizard-destinazione/wizard-destinazione.module#WizardDestinazionePageModule' },
    // { path: 'wizard-data-destinazione', loadChildren: './pages/wizard-data-destinazione/wizard-data-destinazione.module#WizardDataDestinazionePageModule' },
    // { path: 'wizard-dati-data', loadChildren: './pages/wizard-dati-data/wizard-dati-data.module#WizardDatiDataPageModule' },
    // { path: 'wizard-dati-catastali', loadChildren: './pages/wizard-dati-catastali/wizard-dati-catastali.module#WizardDatiCatastaliPageModule' },
    // { path: 'wizard-dati-tassazione', loadChildren: './pages/wizard-dati-tassazione/wizard-dati-tassazione.module#WizardDatiTassazionePageModule' },
    // { path: 'client-home', loadChildren: './pages/client-home/client-home.module#ClientHomePageModule' },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
