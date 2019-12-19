import { Injectable } from "@angular/core";
import { ConstantsService } from '../common/constants.service';

@Injectable()
export class IconeService {

    private tipologiaVilla: Array<string> = [
        "A/1",
        "A/7",
        "A/8",
        "A/9"
    ];
    private tipologiaCasa: Array<string> = [
        "A/2",
        "A/3",
        "A/4",
        "A/5",
        "A/11"
    ];
    private tipologiaAgricolo: Array<string> = [
        "A/6",
        "D/10"
    ];
    private tipologiaUfficio: Array<string> = [
        "A/10",
        "C/3",
        "E/3",
        "E/4",
        "E/6",
        "E/8",
        "E/9",
        "F/1",
        "F/2"
    ];
    private tipologiaAlbergo: Array<string> = [
        "B/1",
        "B/3",
        "C/5",
        "D/2"
    ];
    private tipologiaOspedale: Array<string> = [
        "B/2",
        "D/4"
    ];
    private tipologiaScuola: Array<string> = [
        "B/5"
    ];
    private tipologiaMuseo: Array<string> = [
        "B/6"
    ];
    private tipologiaChiesa: Array<string> = [
        "B/7",
        "E/7"
    ];
    private tipologiaMagazzino: Array<string> = [
        "B/8",
        "C/2",
        "E/5",
        "F/5"
    ];
    private tipologiaNegozio: Array<string> = [
        "C/1",
        "D/8"
    ];
    private tipologiaSport: Array<string> = [
        "C/4",
        "D/6"
    ];
    private tipologiaGarage: Array<string> = [
        "C/6",
        "C/7"
    ];
    private tipologiaFabbrica: Array<string> = [
        "D/1",
        "D/7"
    ];
    private tipologiaTeatro: Array<string> = [
        "D/3"
    ];
    private tipologiaBanca: Array<string> = [
        "D/5"
    ];
    private tipologiaPonte: Array<string> = [
        "D/9",
        "E/2"
    ];
    private tipologiaStazione: Array<string> = [
        "E/1"
    ];
    private tipologiaCantiere: Array<string> = [
        "F/3",
        "F/4",
        "F/6"
    ];

    constructor(private constants: ConstantsService) { }

    public getClasseIcona(tipologia: string): string {
        if (this.tipologiaAgricolo.includes(tipologia)) {
            return this.constants.tipologiaImmobileAgricolo;
        }
        if (this.tipologiaAlbergo.includes(tipologia)) {
            return this.constants.tipologiaImmobileAlbergo;
        }
        if (this.tipologiaBanca.includes(tipologia)) {
            return this.constants.tipologiaImmobileBanca;
        }
        if (this.tipologiaCantiere.includes(tipologia)) {
            return this.constants.tipologiaImmobileCantiere;
        }
        if (this.tipologiaCasa.includes(tipologia)) {
            return this.constants.tipologiaImmobileCasa;
        }
        if (this.tipologiaChiesa.includes(tipologia)) {
            return this.constants.tipologiaImmobileChiesa;
        }
        if (this.tipologiaFabbrica.includes(tipologia)) {
            return this.constants.tipologiaImmobileFabbrica;
        }
        if (this.tipologiaGarage.includes(tipologia)) {
            return this.constants.tipologiaImmobileGarage;
        }
        if (this.tipologiaMagazzino.includes(tipologia)) {
            return this.constants.tipologiaImmobileMagazzino;
        }
        if (this.tipologiaMuseo.includes(tipologia)) {
            return this.constants.tipologiaImmobileMuseo;
        }
        if (this.tipologiaNegozio.includes(tipologia)) {
            return this.constants.tipologiaImmobileNegozio;
        }
        if (this.tipologiaOspedale.includes(tipologia)) {
            return this.constants.tipologiaImmobileOspedale;
        }
        if (this.tipologiaPonte.includes(tipologia)) {
            return this.constants.tipologiaImmobilePonte;
        }
        if (this.tipologiaScuola.includes(tipologia)) {
            return this.constants.tipologiaImmobileScuola;
        }
        if (this.tipologiaSport.includes(tipologia)) {
            return this.constants.tipologiaImmobileSport;
        }
        if (this.tipologiaStazione.includes(tipologia)) {
            return this.constants.tipologiaImmobileStazione;
        }
        if (this.tipologiaTeatro.includes(tipologia)) {
            return this.constants.tipologiaImmobileTeatro;
        }
        if (this.tipologiaUfficio.includes(tipologia)) {
            return this.constants.tipologiaImmobileUfficio;
        }
        if (this.tipologiaVilla.includes(tipologia)) {
            return this.constants.tipologiaImmobileVilla;
        }
        return this.constants.tipologiaImmobileCasa;
    }
}
