const Client = require('node-rest-client').Client;
const client = new Client();
const TOKEN_URL = process.env.INFUSIONSOFT_TOKEN_URL;
const API_URL = process.env.INFUSIONSOFT_API_URL;
const access_token = process.env.INFUSIONSOFT_ACCESS_TOKEN;

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

module.exports.post = postRequest;