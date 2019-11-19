import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService, StoreService, SessionService } from 'broker-lib';

import { LoginRequest, WsToken } from 'broker-lib';

import { Router } from '@angular/router';

import { HomePage } from '../home/home.page';
// mport { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public username: string;
  public password: string;

  constructor(
    private loginService: LoginService,
    private storeService: StoreService,
    private router: Router) { }

  ngOnInit() { }

  public submit(): void {
    const loginRequest: LoginRequest = new LoginRequest();
    loginRequest.username = this.username;
    loginRequest.password = this.password;
    loginRequest.app_chiamante = '';
    loginRequest.id_phone = '';

    this.loginService.Login(loginRequest).subscribe(r => {
      if (r.Success) {
        // ho avuto risposta positiva. Non è detto che sia loggato pero'
        const data: WsToken = r.Data;
        // per il momento si ipotizza che se Success=true allora ci si è loggati
        this.storeService.setUserData(data);
        this.router.navigate(['home']);
        // this.router.navigate(['home']);
      } else {

      }
    });
  }

}
