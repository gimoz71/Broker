/*
 * Public API Surface of my-app-lib
 */

export * from './lib/broker-lib.module';

// servizi ------------------------------------------------
// -- report
export * from './lib/services/report/report.service';
// -- clienti
export * from './lib/services/clienti/clienti.service';
// -- immobili
export * from './lib/services/immobili/immobili.service';
// -- vari
export * from './lib/services/dropdown/dropdown.service';
export * from './lib/services/log-errori/log-errori.service';
export * from './lib/services/common/session.service';
export * from './lib/services/store/store.service';
export * from './lib/services/login/login.service';
export * from './lib/services/common/alert.service';
export * from './lib/services/icone/icone.service';

// handler ------------------------------------------------
export * from './lib/handler/error/error-handler.service';

// modelli ------------------------------------------------
// -- report
export * from './lib/models/report/grafici';
export * from './lib/models/report/graficiAffittuario';
export * from './lib/models/report/graficiAndamentoAnnuale';
export * from './lib/models/report/graficiConcentrazione';
export * from './lib/models/report/graficiIndicatore';
export * from './lib/models/report/reportGenerale';
export * from './lib/models/report/reportGeneraleAttivo';
export * from './lib/models/report/reportGeneralePassivo';
export * from './lib/models/report/reportGeneraleOggettoColonna';
// -- clienti
export * from './lib/models/clienti/cliente';
export * from './lib/models/clienti/abilitaAppClienteRequest';
export * from './lib/models/clienti/bookValue';
export * from './lib/models/clienti/inserimentoClienteRequest';
export * from './lib/models/clienti/inserimentoClienteResponse';
// -- immobili
export * from './lib/models/immobili/immobile';
export * from './lib/models/immobili/affittoDettaglio';
export * from './lib/models/immobili/cancellazioneImmobileRequest';
export * from './lib/models/immobili/cointestatarioDettaglio';
export * from './lib/models/immobili/datiCatastaliDettaglio';
export * from './lib/models/immobili/immobileDettaglio';
export * from './lib/models/immobili/immobileDettaglioVM';
export * from './lib/models/immobili/inserimentoImmobileResponse';
export * from './lib/models/immobili/mutuoDettaglio';
export * from './lib/models/immobili/omiDettaglio';
export * from './lib/models/immobili/spesaDettaglio';
export * from './lib/models/immobili/tassaDettaglio';
export * from './lib/models/immobili/pianoAmmortamento';
export * from './lib/models/immobili/annoPianoAmmortamento';

// -- utenti
export * from './lib/models/login/wsToken';
export * from './lib/models/login/loginRequest';
export * from './lib/models/login/utente';
export * from './lib/models/login/cambioPasswordRequest';
// -- vari
export * from './lib/models/common/errormessage';
export * from './lib/models/common/wslogerrore';
export * from './lib/models/common/ddlitem';
