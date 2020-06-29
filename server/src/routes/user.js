const config = require('../config');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const qs = require('qs');

router.get('/', async (req, res) => {

  if(!req.cookies.access_token) return res.status(401).end();
  const introspectData = { 
    'client_id': config.get('authProviderClientID'),
    'client_secret': config.get('authProviderClientSecret'),
    'token': req.cookies.access_token,
    'token_type_hint': 'access_token'
  };
  const options = {
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  };
  axios.post(config.get('authProviderIntrospectURL'), qs.stringify(introspectData), options)
  .then( 
    introspectResponse => {
      if (!introspectResponse.data.active) return res.status(401).end();
      const options = {
        headers: { 'Authorization': 'Bearer ' + req.cookies.access_token }
      };
      axios.post(config.get('authProviderUserInfoURL'), null, options)
      .then(
        userInfoResponse => {
          return res.status(200).json({
            ...introspectResponse.data,
            ...userInfoResponse.data
          });
        },
        userInfoError => {
          return res.status(401).send(userInfoError);
        }
      );
    },
    introspectError => {
      return res.status(401).send(introspectError);
    }
  );

});

module.exports = router;