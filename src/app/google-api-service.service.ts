import { Injectable } from '@angular/core';

import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '143m15hbklwer1235k1bfqkqj345', //TODO: here comes the real client ID
  scope: 'openid email profile'
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  constructor(
    private readonly oAuthService: OAuthService,
    private router: Router) {

    oAuthService.configure(authCodeFlowConfig);
    oAuthService.logoutUrl = 'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:4200';
  }

  checkLoginStatus = async () => {
    console.log("lefut a checkloginstatus")
    await this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(async () => {
      if (this.oAuthService.hasValidAccessToken()) {
        //van már        
        await this.oAuthService.loadUserProfile().then((userProfile: any) => {
          const { storeInSessionStr } = storeData()
          console.log("van google felhasználó")          
          storeInSessionStr("user", JSON.stringify({ name: userProfile.info.name }));
        })

      } else {
        console.log("nincs bejelentkezett google felhasználó")
      }
    })
  }

  signIn() {
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.oAuthService.initLoginFlow();
    })
  }

  signOut() {
    this.oAuthService.logOut();
  }

}
