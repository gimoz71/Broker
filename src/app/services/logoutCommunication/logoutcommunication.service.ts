import { Subject } from 'rxjs';

export class LogoutCommunicationService {
    private logoutSubject: Subject<boolean> = new Subject<boolean>();
    public logoutObservable = this.logoutSubject.asObservable();

    public comunicateLogout(): void {
        this.logoutSubject.next(true);
    }
}
