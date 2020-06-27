
const httpMocks = require("node-mocks-http");
const sinon = require('sinon')

const config = require('../../config')
const router = require('../../routes/login');

describe('login route defined ', () => {

  it('Should redirect', () => {
    const mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/"
    });
    const mockResponse = httpMocks.createResponse();
    router(mockRequest, mockResponse);
    expect(mockResponse._getStatusCode()).toBe(302);
  });

  it('Redirected call should have the required query parameters', () => {
    sinon.stub(config, "get")
      .withArgs("authProviderClientID").returns("test-id")
      .withArgs("authCallbackURL").returns("https://api.saas.template/authorization-code/callback")
      .withArgs("authProviderAuthorizeURL").returns("https://test.ipd.com/oauth2/v1/authorize");

    const mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/"
    });
    const mockResponse = httpMocks.createResponse();
    router(mockRequest, mockResponse);
    
    const myURL = new URL(mockResponse._getRedirectUrl());
    expect(myURL.host).toBe("test.ipd.com");
    expect(myURL.pathname).toBe("/oauth2/v1/authorize");
    expect(myURL.searchParams.get('redirect_uri')).toBe("https://api.saas.template/authorization-code/callback");  
    expect(myURL.searchParams.get('client_id')).toBe("test-id");  
    expect(myURL.searchParams.get('response_type')).toBe("code");  
    expect(myURL.searchParams.get('scope')).toBe("openid");  
    expect(myURL.searchParams.get('state')).toBe("login");  
  });

});


