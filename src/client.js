const soap = require('soap');
const base_url = "https://api.mindbodyonline.com/0_5_1/";
const apiUrl = "ClientService";
const url = base_url + '/' + apiUrl + '.asmx';
const wsdl = '?wsdl';
const args = {};

const buildArguments = (siteID) => {
    let params = {
        "Request": {
            "Content-Type": "application/json",
            "API-key": process.env.MINDBODY_API_KEY,
            "SourceCredentials": {
                "SourceName": process.env.MINDBODY_SOURCE_NAME,
                "Password": process.env.MINDBODY_PASSWORD,
                "SiteIDs": {
                    "int": siteID
                }
            },
            "UserCredentials": {
                "SiteIDs": {
                    "int": siteID
                },
                "Username": process.env.MINDBODY_STAFF_USER,
                "Password": process.env.MINDBODY_STAFF_PASSWORD
            }
        }
    }
    return params;
}

const getRequiredFields = (params) => {
    return new Promise ((resolve, reject) => {
        soap.createClient(url + wsdl, (err, client) => {
            if (err) {
                throw err;
            }
            client.setEndpoint(url);
            client.GetRequiredClientFields(params, (err, result) => {
                if(err) {
                    console.log(err);
                }
                let requiredFields = result.GetRequiredClientFieldsResult.RequiredClientFields;
                return resolve(requiredFields);
            })
        });
    })
}

const getExistingClient = (params, email) => {
    params.Request['SearchText'] = email;
    return new Promise ((resolve, reject) => {
        soap.createClient(url + wsdl, async (err, client) => {
            if (err) {
                throw err;
            }
            client.setEndpoint(url);
            client.GetClients(params, async (err, result) => {
                if(err) {
                    console.log(err);
                }
                 return resolve(result.GetClientsResult.Clients);
            })
        });
    })
}	

const convertToObject = (fields) => {
    console.log(fields);
    let rFields = {};
    for(let i of fields) {
        rFields[i] = "";
    }
    return rFields;
}

const addClient = (args, fields) => {
    let params = {
        Request: {
            'Content-Type': 'application/json',
            'API-key': process.env.MINDBODY_API_KEY,
            SourceCredentials: args.Request.SourceCredentials,
            Clients: {
                Client: fields
            }
        }
    }
    console.log(params);
    return new Promise((resolve, reject) => {
        soap.createClient(url + wsdl, (err, client) => {
            if (err) {
                throw err;
            }
            client.setEndpoint(url);
            client.AddOrUpdateClients(params, (err, result) => {
                if(err) {
                    console.log(err);
                }
                return resolve(result.AddOrUpdateClientsResult.Clients.Client);
            })
        });
    });
}

module.exports.getRequiredFields = getRequiredFields;
module.exports.addClient = addClient;  
module.exports.getExistingClient = getExistingClient;  
module.exports.buildArguments = buildArguments;