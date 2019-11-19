import { CointestatarioDettaglio } from './cointestatarioDettaglio';
import { TassaDettaglio } from './tassaDettaglio';
import { SpesaDettaglio } from './spesaDettaglio';
import { AffittoDettaglio } from './affittoDettaglio';
import { MutuoDettaglio } from './mutuoDettaglio';
import { DatiCatastaliDettaglio } from './datiCatastaliDettaglio';
import { OmiDettaglio } from './omiDettaglio';

export class ImmobileDettaglio {
    public proprieta_id: number;
    public tipologie_catastali_id: number;
    public codice_tipologia: string;
    public descrizione_tipologia: string;
    public data_aggiornamento: string;
    public valore_acquisto: number;
    public quota: number;
    public catastale_cod: string;
    public indirizzo: string;
    public civico: string;
    public citta: string;
    public cap: string;
    public provincia: string;
    public latitudine: string;
    public longitudine: string;
    public prima_casa: boolean;
    public destinazione_uso_id: number;
    public descrizione_uso: string;
    public mutuo: boolean;
    public affitto: boolean;
    public cointestatari: Array<CointestatarioDettaglio>;
    public tasse: Array<TassaDettaglio>;
    public spese: Array<SpesaDettaglio>;
    public affitto_dettaglio: AffittoDettaglio;
    public mutuo_dettaglio: MutuoDettaglio;
    public dati_catastali: DatiCatastaliDettaglio;
    public omi: OmiDettaglio;
}