const config = require('../config');
const express = require('express');
const router = express.Router();

const queryParams = [
  `client_id=${config.get('authProviderClientID')}`,
  `redirect_uri=${config.get('authCallbackURL')}`,
  `response_type=code`,
  `scope=openid`,
  `state=login`
].join("&");

router.get('/', (req, res) => {
  res.redirect(`${config.get('authProviderAuthorizeURL')}?${queryParams}`);
});

module.exports = {
  router
} 