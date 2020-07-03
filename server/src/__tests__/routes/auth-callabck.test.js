
const httpMocks = require("node-mocks-http");
const sinon = require('sinon')

const qs = require('qs');
const axios = require('axios');
const config = require('../../config')
const router = require('../../routes/auth-callback');


describe('Auth callback route defined ', () => {
  let sandbox;

  beforeEach(function() {
    sandbox = require('sinon').createSandbox();
    sandbox.stub(config, "get")
      .withArgs("siteURL").returns("https://www.saas-template")
      .withArgs("siteAuthCallbackURL").returns("https://www.saas-template/auth-callback")
      .withArgs("authProviderClientID").returns("client-id")
      .withArgs("authProviderClientSecret").returns("client-secret")
      .withArgs("authCallbackURL").returns("https://api.saas.template/authorization-code/callback")
      .withArgs("authProviderTokenURL").returns("https://test.ipd.com/oauth2/v1/token");
  });

  afterEach(function() {
    sandbox.restore();
  });
 
  it('Should redirect to UI on success', (done) => {
    const data = { token_type: 'Bearer', access_token: 'blah blah blah' };
    const resolved = new Promise((r) => r({ data }));
    sandbox.stub(axios, 'post').returns(resolved);

    const mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/"
    });
    const mockResponse = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });
    mockResponse.on('end', function() {
      expect(this.cookies).toHaveProperty("authorization");
      expect(this._getStatusCode()).toBe(302);
      expect(this._getRedirectUrl()).toBe("https://www.saas-template/auth-callback");
      done();
    });
    
    router(mockRequest, mockResponse);
  });
 
  it('Should redirect to UI on failure', (done) => {
    const rejected = new Promise((_, r) => r("Didn't Work!"));
    sandbox.stub(axios, 'post').returns(rejected);

    const mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/"
    });
    const mockResponse = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });
    mockResponse.on('end', function() {
      expect(this.cookies).not.toHaveProperty("authorization");
      expect(this._getStatusCode()).toBe(302);
      expect(this._getRedirectUrl()).toBe("https://www.saas-template/auth-callback");
      done();
    });

    router(mockRequest, mockResponse);    
  });
 
  it('Should post details to IPD', async () => {
    const data = { token_type: 'Bearer', access_token: 'blah blah blah' };
    const resolved = new Promise((r) => r({ data }));
    const axiosStub = sandbox.stub(axios, 'post').returns(resolved);

    const mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/?code=auth-code"
    });
    const mockResponse = httpMocks.createResponse();
    await router(mockRequest, mockResponse);
    
    sinon.assert.calledOnce(axiosStub);

    const expected = qs.stringify({ 
      'client_id': 'client-id',
      'client_secret': 'client-secret',
      'grant_type': 'authorization_code',
      'redirect_uri': 'https://api.saas.template/authorization-code/callback',
      'code': "auth-code"
    });
  
    expect(axiosStub.getCall(0).args[0]).toBe("https://test.ipd.com/oauth2/v1/token");
    expect(axiosStub.getCall(0).args[1]).toBe(expected);
    expect(axiosStub.getCall(0).args[2]).toStrictEqual({ headers: { 'content-type': 'application/x-www-form-urlencoded' } });
  });

  it("Should put access token in HttpOnly Cookie", (done) => {
    const data = { token_type: 'Bearer', access_token: 'whatever it returned from the idp' };
    const resolved = new Promise((r) => r({ data }));
    const axiosStub = sandbox.stub(axios, 'post').returns(resolved);

    const mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/?code=auth-code"
    });
    const mockResponse = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });

    mockResponse.on('end', function() {
      expect(this.cookies).toHaveProperty("access_token");
      expect(this.cookies.access_token).toHaveProperty("value", 'whatever it returned from the idp');
      expect(this.cookies.access_token).toHaveProperty("options", {"httpOnly": true});
      done();
    });

    router(mockRequest, mockResponse);
  });

  it("Should put id token in HttpOnly Cookie", (done) => {
    const data = { token_type: 'Bearer', access_token: 'whatever it returned from the idp', id_token: 'id_token returned from the idp'};
    const resolved = new Promise((r) => r({ data }));
    const axiosStub = sandbox.stub(axios, 'post').returns(resolved);

    const mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/?code=auth-code"
    });
    const mockResponse = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });

    mockResponse.on('end', function() {
      expect(this.cookies).toHaveProperty("id_token");
      expect(this.cookies.id_token).toHaveProperty("value", 'id_token returned from the idp');
      expect(this.cookies.id_token).toHaveProperty("options", {"httpOnly": true});
      done();
    });

    router(mockRequest, mockResponse);
  });

  it("Should create readable authorization cookie", (done) => {
    const data = { token_type: 'Bearer', access_token: 'blah blah blah' };
    const resolved = new Promise((r) => r({ data }));
    const axiosStub = sandbox.stub(axios, 'post').returns(resolved);

    const mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/?code=auth-code"
    });
    const mockResponse = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });

    mockResponse.on('end', function() {
      expect(this.cookies).toHaveProperty("authorization");
      expect(this.cookies.authorization).toHaveProperty("value", JSON.stringify({user:'foobar'}));
      expect(this.cookies.authorization).toHaveProperty("options", {"httpOnly": false});
      done();
    });

    router(mockRequest, mockResponse);
  });

});


