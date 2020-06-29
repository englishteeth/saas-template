const config = require('../config');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const id_token_hint = req.cookies.id_token
  res.clearCookie("id_token");
  res.clearCookie("access_token");
  res.clearCookie("authorization");
  const queryParams = [
    `id_token_hint=${id_token_hint}`,
    `post_logout_redirect_uri=${config.get('siteURL')}`
  ].join("&");
  res.redirect(`${config.get('authProviderLogoutURL')}?${queryParams}`);
});

module.exports = router
