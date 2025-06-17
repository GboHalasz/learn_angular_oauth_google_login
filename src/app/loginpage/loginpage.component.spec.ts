import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginpageComponent } from './loginpage.component';
import {GoogleApiService} from "../services/google-api-service.service";
import {OAuthService} from "angular-oauth2-oidc";
import {MockOauthService} from "../services/mock-oauth-service";

describe('LoginpageComponent', () => {
  let component: LoginpageComponent;
  let fixture: ComponentFixture<LoginpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginpageComponent ],
      providers: [
        GoogleApiService,
        { provide: OAuthService, useClass: MockOauthService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
