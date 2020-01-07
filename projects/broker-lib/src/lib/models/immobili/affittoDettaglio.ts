export class AffittoDettaglio {
    public proprieta_affitto_id: number = 0;
    public tipo_affittuario_id: number;
    public descrizione_affittuario: string = '';
    public spese_condominiali: boolean = false;
    public importo_spese_condominiali: number = 0;
    public cedolare_secca: boolean = false;
    public aliquota_cedolare: number = 0;
    public prima_scadenza_anni: number = 0;
    public data_inizio: string = '';
    public importo_mensile: number = 0;
}