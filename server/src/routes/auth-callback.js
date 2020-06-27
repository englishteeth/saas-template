const config = require('../config');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const qs = require('qs');
const jws = require('jws');

var decodeToken = function (jwt, cb) {
  var decoded = jws.decode(jwt);
  if (!decoded) return cb("Unable to decode token");
  var payload = decoded.payload;

  //try parse the payload
  if(typeof payload === 'string') {
    try {
      var obj = JSON.parse(payload);
      if(obj !== null && typeof obj === 'object') {
        payload = obj;
      }
    } catch (e) { }
  }

  return cb(null, {
    header: decoded.header,
    payload: payload,
    signature: decoded.signature
  });
};

router.get('/', async(req, res) => {
  const data = { 
    'client_id': config.get('authProviderClientID'),
    'client_secret': config.get('authProviderClientSecret'),
    'grant_type': 'authorization_code',
    'redirect_uri': config.get('authCallbackURL'),
    'code': req.query.code
  };
  const options = {
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  };
  axios.post(config.get('authProviderTokenURL'), qs.stringify(data), options)
  .then( 
    response => {
      // decodeToken(response.data.access_token, (err, decodedToken) => {
      //   if (err) return new Error(err);
      //   console.log(decodedToken);
      // });
      res.cookie('access_token' , response.data.access_token, {httpOnly: true});
      res.cookie('authorization' , {user:'foobar'}, {httpOnly: false});
      res.setHeader(response.data.token_type, response.data.access_token);
      res.redirect(config.get('siteURL'));
    },
    error => {
      // console.log(error);
      res.redirect(config.get('siteURL'));
    }
  );

});

module.exports = router
