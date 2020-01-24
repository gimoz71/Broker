import { Utente } from './utente';
import { Cliente } from '../clienti/cliente';

export class WsToken {
    public token_value: string;
    public tipo_utente: string;
    public utente: Utente;
    public cliente: Cliente;
}
