import { TestBed } from '@angular/core/testing';
import { OAuthService } from 'angular-oauth2-oidc';
import { GoogleApiService } from './google-api-service.service';
import { MockOauthService } from "./mock-oauth-service";

describe('GoogleApiService', () => {
  let service: GoogleApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GoogleApiService,
        { provide: OAuthService, useClass: MockOauthService }
      ]
    });
    service = TestBed.inject(GoogleApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
