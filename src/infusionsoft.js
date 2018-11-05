const Client = require('node-rest-client');
const client = new Client();

const params = {
  client_id: process.env.INFUSIONSOFT_CLIENT_ID,
  client_secret: process.env.INFUSIONSOFT_CLIENT_SECRET,
  code: '',
  scope: 'full'
}

client.post('https://api.infusionsoft.com/token', params, (data, response) => {
  console.log(data);
})