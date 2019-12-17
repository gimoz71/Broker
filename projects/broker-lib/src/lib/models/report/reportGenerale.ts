import { ReportGeneraleAttivo } from './reportGeneraleAttivo';
import { ReportGeneralePassivo } from './reportGeneralePassivo';

export class ReportGenerale {
    public proprieta_id: number;
    public codice_tipologia: string;
    public descrizione_tipologia: string;
    public valore_acquisto: number;
    public quota: number;
    public indirizzo: string;
    public civico: string;
    public citta: string;
    public cap: string;
    public provincia: string;
    public prima_casa: string;
    public passivi: Array<ReportGeneralePassivo>;
    public attivo: ReportGeneraleAttivo;
}
