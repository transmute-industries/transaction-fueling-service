export default {
  issuer: process.env.REACT_APP_OKTA_URL,
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: process.env.REACT_APP_OKTA_CLIENT_ID
}
