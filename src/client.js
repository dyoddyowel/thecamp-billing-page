const soap = require('./soapClient');
const service = "ClientService";
const args = {};

const buildArguments = (siteID) => {
    let params = {
        "Request": {
            "Content-Type": "application/json",
            "API-key": 'process.env.MINDBODY_API_KEY',
            "SourceCredentials": {
                "SourceName": 'OnePercentNutrition',
                "Password": 'gj9RdLNeymPV7TK4kusMrzG7NYw=',
                "SiteIDs": {
                    "int": siteID
                }
            },
            "UserCredentials": {
                "SiteIDs": {
                    "int": siteID
                },
                "Username": 'Alejandra@thecamptc.com',
                "Password": 'fitness102'
            }
        }
    }
    return params;
}

const getRequiredFields = async (params) => {
    let client = await soap(service);
    return new Promise ((resolve, reject) => {
        client.GetRequiredClientFields(params, (err, result) => {
            if(err) {
                console.log(err);
            }
            let requiredFields = result['GetRequiredClientFieldsResult']['RequiredClientFields'];
            return resolve(requiredFields);
        })     
    })
}

const getExistingClient = async (params, email) => {
    let client = await soap(service);
    params.Request['SearchText'] = email;
    return new Promise ((resolve, reject) => {
        client.GetClients(params, async (err, result) => {
            if(err) {
                console.log(err);
            }
             return resolve(result['GetClientsResult']['Clients']);
        })
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

const addClient = async (args, fields) => {
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
    console.log(params)
    let client = await soap(service);
    return new Promise((resolve, reject) => {
        client.AddOrUpdateClients(params, (err, result) => {
                if(err) {
                    console.log(err);
                    reject(err);
                }
                console.log(result['AddOrUpdateClientsResult']['Clients']);
                return resolve(result['AddOrUpdateClientsResult']['Clients']['Client']);
        })
    });
}

module.exports.getRequiredFields = getRequiredFields;
module.exports.addClient = addClient;  
module.exports.getExistingClient = getExistingClient;  
module.exports.buildArguments = buildArguments;