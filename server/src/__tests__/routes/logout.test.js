
const httpMocks = require("node-mocks-http");
const sinon = require('sinon')

const config = require('../../config')
const router = require('../../routes/logout');

describe('logout route defined ', () => {

  it('Should redirect', (done) => {
    sinon.stub(config, "get")
    .withArgs("siteURL").returns("https://www.saas-template")
    .withArgs("authProviderLogoutURL").returns("https://test.ipd.com/oauth2/v1/logout");

    const mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/", 
      cookies: { id_token: "FOO_BAR" }
    });
    const mockResponse = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });
    mockResponse.on('end', function() {
      expect(this._getStatusCode()).toBe(302);
      const url = new URL(this._getRedirectUrl());
      expect(url.host).toBe("test.ipd.com");
      expect(url.pathname).toBe("/oauth2/v1/logout");
      expect(url.searchParams.get('id_token_hint')).toBe("FOO_BAR");  
      expect(url.searchParams.get('post_logout_redirect_uri')).toBe("https://www.saas-template");  
      done();
    });
    
    router(mockRequest, mockResponse);
  });

});


