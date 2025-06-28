
export class MockOauthService {
  initLoginFlow = jasmine.createSpy('initLoginFlow');
  hasValidAccessToken = jasmine.createSpy('hasValidAccessToken').and.returnValue(true);
  loadDiscoveryDocumentAndTryLogin = jasmine.createSpy('loadDiscoveryDocumentAndTryLogin').and.returnValue(Promise.resolve(true));
  configure = jasmine.createSpy('configure');
}
