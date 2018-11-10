const Client = require('node-rest-client').Client;
const client = new Client();
const TOKEN_URL = process.env.INFUSIONSOFT_TOKEN_URL;
const API_URL = process.env.INFUSIONSOFT_API_URL;
const access_token = process.env.INFUSIONSOFT_ACCESS_TOKEN;
const userURL = 'https://signin.infusionsoft.com/app/oauth/authorize';


const postRequest = async (params, url) => {
  let post_params = {};
  post_params['data'] = params;
  post_params['headers'] = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + access_token
  }
  let newurl = API_URL + url;
  return new Promise((resolve, reject) => {
    client.post(newurl, post_params, (data, response) => {
      return resolve(data);
    });
  });
}

const postRequestAgain = (params, url) => {
  let post_params = {};
  post_params['data'] = params;
  post_params['headers'] = {
    "Content-Type": "application/x-www-form-urlencoded",
    // "Authorization": "Bearer " + access_token
  }
  // let newurl =  url;
  return new Promise((resolve, reject) => {
    client.post(url, post_params, (data, response) => {
      return resolve(data);
    });
  });
}

let t = {
  'client_id': 'yrjmfm68g6m89hqce9797xge',
  'client_secret': '8tcZ5JQCqB',
  'redirect_uri': 'http://michaelburnley.com',
  'response_type': 'code',
  'scope': 'full',
  'code': '5q3dqpy9erjksqmcepagq2jp',
  'grant_type': 'authorization_code',
}

let s = {
  'client_id': 'yrjmfm68g6m89hqce9797xge',
  'client_secret': '8tcZ5JQCqB',
  'redirect_uri': 'http://michaelburnley.com',
  'code': 'v346jq5tv3vytqrrcmgxc56x',
  'grant_type': 'authorization_code',
}

let x = {};

let a = userURL + '?client_id=' + t.client_id + '&redirect_uri=' + t.redirect_uri +'&response_type=' + t.response_type + '&scope=' + t.scope;
console.log(a);

const refreshTokenRequest = () => {
  let auth_string = s.client_id + ':' + s.client_secret;
  let auth_header = 'Basic' + auth_string.toString('base64')
  let params = {
    'Header:Authorization': auth_header,
    'refresh_token': refresh_token,
    'grant_type': 'refresh_token'
  }
  let u = process.env.INFUSIONSOFT_TOKEN_URL + '?client_id=' + s.client_id + '?client_secret=' + s.client_secret + '&redirect_uri=' + s.redirect_uri +'&code=' + s.code;
}

let request = async () => {
  let u = process.env.INFUSIONSOFT_TOKEN_URL + '?client_id=' + s.client_id + '?client_secret=' + s.client_secret + '&redirect_uri=' + s.redirect_uri +'&code=' + s.code;
  console.log(u);
  let b = await postRequestAgain(s, u);
  console.log(b);
}

module.exports.post = postRequest;
module.exports.request = request;