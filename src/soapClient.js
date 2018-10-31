const soap = require('soap');
const base_url = "https://api.mindbodyonline.com/0_5_1/";

const soapClient = async (service) => {
    let url = base_url + '/' + service + '.asmx';
    let wsdl = '?wsdl';

    soap.createClient(url + wsdl, (err, client) => {
        if (err) {
            throw err;
        }
    
        client.setEndpoint(url);
    });
}

module.exports = soapClient;