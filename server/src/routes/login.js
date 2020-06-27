const config = require('../config');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const queryParams = [
    `client_id=${config.get('authProviderClientID')}`,
    `redirect_uri=${config.get('authCallbackURL')}`,
    `response_type=code`,
    `scope=openid`,
    `state=login`
  ].join("&");
  res.redirect(`${config.get('authProviderAuthorizeURL')}?${queryParams}`);
});

module.exports = router
