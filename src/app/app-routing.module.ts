import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'scheda-immobile', loadChildren: './scheda-immobile/scheda-immobile.module#SchedaImmobilePageModule' },
  { path: 'report', loadChildren: './report/report.module#ReportPageModule' },
  { path: 'analisi', loadChildren: './analisi/analisi.module#AnalisiPageModule' },
  { path: 'nuovo-cliente', loadChildren: './nuovo-cliente/nuovo-cliente.module#NuovoClientePageModule' },
  { path: 'scheda-cliente', loadChildren: './scheda-cliente/scheda-cliente.module#SchedaClientePageModule' },
  { path: 'wizard', loadChildren: './wizard/wizard.module#WizardPageModule' },
  { path: 'patrimonio', loadChildren: './patrimonio/patrimonio.module#PatrimonioPageModule' },
  { path: 'catastali', loadChildren: './catastali/catastali.module#CatastaliPageModule' },
  { path: 'report-generale', loadChildren: './report-generale/report-generale.module#ReportGeneralePageModule' },
  { path: 'report-analisi', loadChildren: './report-analisi/report-analisi.module#ReportAnalisiPageModule' },
  { path: 'ammortamento', loadChildren: './ammortamento/ammortamento.module#AmmortamentoPageModule' },
  { path: 'wizard-destinazione', loadChildren: './wizard-destinazione/wizard-destinazione.module#WizardDestinazionePageModule' },
  { path: 'wizard-data-destinazione', loadChildren: './wizard-data-destinazione/wizard-data-destinazione.module#WizardDataDestinazionePageModule' },
  { path: 'wizard-dati-data', loadChildren: './wizard-dati-data/wizard-dati-data.module#WizardDatiDataPageModule' },
  { path: 'wizard-dati-catastali', loadChildren: './wizard-dati-catastali/wizard-dati-catastali.module#WizardDatiCatastaliPageModule' },
  { path: 'wizard-dati-tassazione', loadChildren: './wizard-dati-tassazione/wizard-dati-tassazione.module#WizardDatiTassazionePageModule' },
  { path: 'client-home', loadChildren: './client-home/client-home.module#ClientHomePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
