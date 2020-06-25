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

router.get('/', (req, res) => {
  const data = { 
    'client_id': config.authProviderClientID,
    'client_secret': config.authProviderClientSecret,
    'grant_type': 'authorization_code',
    'redirect_uri': config.authCallbackURL,
    'code': req.query.code
  };
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url: config.authProviderTokenURL
  };
  axios(options)
  .then( 
    response => {
    decodeToken(response.data.access_token, (err, decodedToken) => {
      if (err) return new Error(err);
      console.log(decodedToken);
      res.cookie('token_signature' , decodedToken.signature, {httpOnly: true});
    });

    res.setHeader(response.data.token_type, response.data.access_token);
    res.redirect(`http://localhost:3000`);
    },
    error => {
    console.log(error);
    res.redirect(`http://localhost:3000`);
    }
  );

});

module.exports = router;