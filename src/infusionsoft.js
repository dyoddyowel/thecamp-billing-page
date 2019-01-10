const Client = require('node-rest-client').Client;
const opn = require('opn');
const client = new Client();
// const TOKEN_URL = process.env.INFUSIONSOFT_TOKEN_URL;
// const API_URL = process.env.INFUSIONSOFT_API_URL;
// const access_token = process.env.INFUSIONSOFT_ACCESS_TOKEN;
const TOKEN_URL = 'https://api.infusionsoft.com/token';
const API_URL = 'https://api.infusionsoft.com/crm/rest/v1';
const access_token = 'uh27d2dq3665pddy5pmwyp44';
const OAUTH_URL = process.env.INFUSIONSOFT_OAUTH_URL;

const buildURL = (url, params) => {
  let keys = Object.keys(params);
  let param_string = '?';
  keys.forEach((key) => {
  
    let string = "&" + key + "=" + params[key];
    param_string = param_string + string;
  });
  return url + param_string;
}

const postRequest = async (params, url, authType = "Bearer ") => {
  let post_params = {};
  post_params['data'] = params;
  post_params['headers'] = {
    "Content-Type": "application/json",
    "Authorization": authType + access_token
  }
  let newurl = API_URL + url;
  return new Promise((resolve, reject) => {
    client.post(newurl, post_params, (data, response) => {
      return resolve(data);
    });
  });
}

const refreshToken = () => {
  let params = {
    grant_type: 'refresh_token',
    refresh_token: process.env.INFUSIONSOFT_REFRESH_TOKEN,
  }
  let url = buildURL(TOKEN_URL, params);
  postRequest(params, url, 'Basic ');
}

const requestPermission = () => {
  let params = {  
    client_id: process.env.INFUSIONSOFT_CLIENT_ID,
    redirect_uri: process.env.INFUSIONSOFT_REDIRECT_URI,
    response_type: 'code',
    scope: 'full',
  }
  let url = buildURL(OAUTH_URL, params);
  opn(url);
}

const accessTokenRequest = () => {
  let params = {  
    client_id: process.env.INFUSIONSOFT_CLIENT_ID,
    client_secret: process.env.INFUSIONSOFT_CLIENT_SECRET,
    code: process.env.INFUSIONSOFT_CODE,
    grant_type: 'authorization_code',
    redirect_uri: process.env.INFUSIONSOFT_REDIRECT_URI,
  }
  let url = buildURL(TOKEN_URL, params);
}

module.exports.post = postRequest;
module.exports.refresh = refreshToken;
module.exports.request = requestPermission;