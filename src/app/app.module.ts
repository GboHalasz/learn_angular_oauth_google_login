import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntrancePageComponent } from './entrance-page/entrance-page.component';
import { LoginpageComponent } from './loginpage/loginpage.component';

@NgModule({
  declarations: [
    AppComponent,
    EntrancePageComponent,
    LoginpageComponent
  ],
  imports: [    
    BrowserModule,      
    AppRoutingModule,    
    HttpClientModule,
    OAuthModule,  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
