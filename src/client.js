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
                "Username": process.env.MINDBODY_STAFF_USERNAME,
                "Password": process.env.MINDBODY_STAFF_PASSWORD
            }
        }
    }
    return params;
}

const getRequiredFields = async (params) => {
    soap.createClient(url + wsdl, (err, client) => {
        if (err) {
            throw err;
        }
        client.setEndpoint(url);
        client.GetRequiredClientFields(args, (err, result) => {
            if(err) {
                console.log(err);
            }
            let requiredFields = convertToObject(result.GetRequiredClientFieldsResult.RequiredClientFields.string);
            console.log(requiredFields);
            // addClient(requiredFields);
        })
    });
}

const getExistingClient = async (email) => {
    const params = {...args};
    // params.UserCredentials.Username = '_' + params.UserCredentials.Username;
    params.Request['SearchText'] = email;
    console.log(params);
    soap.createClient(url + wsdl, async (err, client) => {
        if (err) {
            throw err;
        }
        client.setEndpoint(url);
        await client.GetClients(params, async (err, result) => {
            if(err) {
                console.log(err);
            }
            console.log("test",result);
        })
    });
}	

const convertToObject = (fields) => {
    console.log(fields);
    let rFields = {};
    for(let i of fields) {
        rFields[i] = "";
    }
    return rFields;
}

const addClient = async (fields) => {
    soap.createClient(url + wsdl, async (err, client) => {
        if (err) {
            throw err;
        }
        client.setEndpoint(url);
        client.AddOrUpdateClients(args, async (err, result) => {
            if(err) {
                console.log(err);
            }
            console.log(JSON.stringify(result));
            await JSON.stringify(result);
        })
    });
}

module.exports.getRequiredFields = getRequiredFields;
module.exports.addClient = addClient;  
module.exports.getExistingClient = getExistingClient;  
module.exports.buildArguments = buildArguments;