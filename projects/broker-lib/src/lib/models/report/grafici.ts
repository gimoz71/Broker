import { GraficiAndamentoAnnuale } from './graficiAndamentoAnnuale';
import { GraficiIndicatore } from './graficiIndicatore';
import { GraficiConcentrazione } from './graficiConcentrazione';
import { GraficiAffittuario } from './graficiAffittuario';

export class Grafici {
    public andamento_annuale: Array<GraficiAndamentoAnnuale>;
    public indicatori: Array<GraficiIndicatore>;
    public concentrazione: Array<GraficiConcentrazione>;
    public affittuari: Array<GraficiAffittuario>;
}
