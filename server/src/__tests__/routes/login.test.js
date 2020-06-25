
const httpMocks = require("node-mocks-http");
const sinon = require('sinon')

const config = require('../../config')
const { router } = require('../../routes/login');


describe('login route defined ', () => {

  it('Should exists', () => {
    expect(router).resolves;
  });

  it('Should redirect', () => {
    sinon.stub(config, "get").withArgs("authProviderAuthorizeURL").returns("http:/test.munky.com");

    const mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/"
    });

    const mockResponse = httpMocks.createResponse();
  
    router(mockRequest, mockResponse);

    const status  = mockResponse._getStatusCode();
    expect(status).toBe(302);
    
    const myURL = new URL(mockResponse._getRedirectUrl());
    console.log(myURL.host);
    console.log(myURL.pathname);
    console.log(myURL.searchParams.get('client_id'));  

  });
});


