const env = require("dotenv");

if (env.config().error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {
  port: parseInt(process.env.PORT || '9000', 10),
  authCallbackURL: process.env.AUTH_CALLBACK_URL,
  authProviderAuthorizeURL: process.env.AUTH_PROVIDER_AUTHORIZE_URL,
  authProviderTokenURL: process.env.AUTH_PROVIDER_TOKEN_URL,
  authProviderClientID: process.env.AUTH_PROVIDER_CLIENT_ID,
  authProviderClientSecret: process.env.AUTH_PROVIDER_CLIENT_SECRET
}

const get = (item) => config[item];

module.exports = { 
  get 
}
