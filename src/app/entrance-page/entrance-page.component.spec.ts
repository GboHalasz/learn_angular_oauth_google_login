import { ComponentFixture, TestBed } from '@angular/core/testing';
import {OAuthService} from "angular-oauth2-oidc";
import { GoogleApiService } from "../services/google-api-service.service";
import { MockOauthService} from "../services/mock-oauth-service";
import { EntrancePageComponent } from './entrance-page.component';

describe('EntrancePageComponent', () => {
  let component: EntrancePageComponent;
  let fixture: ComponentFixture<EntrancePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrancePageComponent ],
      providers: [
        GoogleApiService,
        { provide: OAuthService, useClass: MockOauthService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
