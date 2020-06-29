
const httpMocks = require("node-mocks-http");
const sinon = require('sinon')

const qs = require('qs');
const axios = require('axios');
const config = require('../../config')
const router = require('../../routes/user');


describe('Auth callback route defined ', () => {
  let sandbox;
  let mockRequest;
  let mockResponse;

  beforeEach(function() {
    mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/"
    });
    mockResponse = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });
    sandbox = require('sinon').createSandbox();
    sandbox.stub(config, "get")
      .withArgs("authProviderClientID").returns("client-id")
      .withArgs("authProviderClientSecret").returns("client-secret")
      .withArgs("authProviderIntrospectURL").returns("https://test.ipd.com/oauth2/v1/introspect")
      .withArgs("authProviderUserInfoURL").returns("https://test.ipd.com/oauth2/v1/userinfo");
  });

  afterEach(function() {
    sandbox.restore();
  });
 
  it('Should return unauthorized if no access token', (done) => {

    mockResponse.on('end', function() {
      expect(this._getStatusCode()).toBe(401);
      done();
    });
    
    router(mockRequest, mockResponse);
  });

  it('Should introspect if access token present', async () => {
    mockRequest.cookies = { access_token: 'blah blah' };
    const resolved = new Promise((r) => r({ data: { "active" : false } }));
    const axiosStub = sandbox.stub(axios, 'post').returns(resolved);

    await router(mockRequest, mockResponse);

    sinon.assert.calledOnce(axiosStub);

    const expected = qs.stringify({ 
      'client_id': 'client-id',
      'client_secret': 'client-secret',
      'token': "blah blah",
      'token_type_hint': 'access_token'
    });

    expect(axiosStub.getCall(0).args[0]).toBe("https://test.ipd.com/oauth2/v1/introspect");
    expect(axiosStub.getCall(0).args[1]).toBe(expected);
    expect(axiosStub.getCall(0).args[2]).toStrictEqual({ headers: { 'content-type': 'application/x-www-form-urlencoded' } });
  });

  it('Should handle authentication introspect error', async () => {
    mockRequest.cookies = { access_token: 'blah blah' };
    const rejected = new Promise((_, r) => r({ "error" : "invalid_client", "error_description" : "No client credentials found." }));
    const axiosStub = sandbox.stub(axios, 'post').returns(rejected);

    await router(mockRequest, mockResponse);

    sinon.assert.calledOnce(axiosStub);

    expect(mockResponse._getStatusCode()).toBe(401);
  });

  it('Should request userinfo if access token valid/active', async () => {
    mockRequest.cookies = { access_token: 'blah-blah' };
    const resolvedIntrospect = new Promise((r) => r({ data: { "active" : true }}));
    const resolvedUser = new Promise((r) => r({ data: { "active" : true }}));
    const axiosStub = sandbox.stub(axios, 'post');
    axiosStub.onCall(0).returns(resolvedIntrospect);
    axiosStub.onCall(1).returns(resolvedUser);

    await router(mockRequest, mockResponse);

    sinon.assert.calledTwice(axiosStub);

    expect(axiosStub.getCall(1).args[0]).toBe("https://test.ipd.com/oauth2/v1/userinfo");
    expect(axiosStub.getCall(1).args[2]).toStrictEqual({ headers: { 'Authorization': 'Bearer blah-blah' } });
  });

  it('Should return userinfo if access token valid/active', (done) => {
    mockRequest.cookies = { access_token: 'blah-blah' };
    const resolvedIntrospect = new Promise((r) => r({data: { "active" : true } }));
    const resolvedUser = new Promise((r) => r({ data: {"sub": "00uid4BxXw6I6TV4m0g3","name" :"John Doe","nickname":"Jimmy",} }));
    const axiosStub = sandbox.stub(axios, 'post');
    axiosStub.onCall(0).returns(resolvedIntrospect);
    axiosStub.onCall(1).returns(resolvedUser);

    mockResponse.on('end', function() {
        expect(mockResponse._getStatusCode()).toBe(200);
        const result = mockResponse._getJSONData();
        expect(result.sub).toBe('00uid4BxXw6I6TV4m0g3');
        expect(result.name).toBe('John Doe');
        expect(result.nickname).toBe('Jimmy');
        done();
    });

    router(mockRequest, mockResponse);
  });

});


