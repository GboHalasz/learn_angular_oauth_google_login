import { Injectable } from '@angular/core';

import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { UserService } from './user.service';

const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: environment.googleClientId,
  scope: 'openid email profile'
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  constructor(
    private readonly oAuthService: OAuthService,
    private router: Router,
    private userService: UserService) {

    oAuthService.configure(authCodeFlowConfig);
  }

  checkLoginStatus = async () => {

    await this.oAuthService.loadDiscoveryDocumentAndTryLogin()
      if (this.oAuthService.hasValidAccessToken()) {
        sessionStorage.setItem('loginMethod', 'google');
        await this.oAuthService.loadUserProfile().then((userProfile: any) => {
          this.userService.user = { name: userProfile.info.name }
          console.log("A Google user is currently logged in.")
        })

      } else {
        sessionStorage.setItem('loginMethod', 'local');
        console.log("There is no logged-in Google user.")
      }
  }

  signIn() {
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.oAuthService.initLoginFlow();
    })
  }

  async signOut(){
    this.oAuthService.logOut(true);
  }

}
