const Client = require('node-rest-client').Client;
const client = new Client();

const getRequest = (url) => {
    client.get(url, (data, response) => {
        console.log(data);
        console.log(response);
    })
};

const postRequest = (url, args) => {
    client.post(url, args, (data, response) => {
        console.log(data);
        console.log(response);
    })
};

const putsRequest = (url, args) => {
    client.puts(url, args, (data, response) => {
        console.log(data);
        console.log(response);
    })
};

const patchRequest = (url, args) => {
    client.post(url, args, (data, response) => {
        console.log(data);
        console.log(response);
    })
};

module.exports.get = getRequest;
module.exports.post = postRequest;
module.exports.puts = putsRequest;
module.exports.patch = patchRequest;