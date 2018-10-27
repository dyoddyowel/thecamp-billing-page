const Client = require('node-rest-client').Client;
const client = new Client();

const getRequest = (url) => {
    client.get(url, (data, response) => {
        // console.log(data);
        console.log(response);
    })
}

module.exports = getRequest;