const soap = require('soap');
const base_url = "https://api.mindbodyonline.com/0_5_1/";
const apiUrl = "ClientService";
const url = base_url + '/' + apiUrl + '.asmx';
const wsdl = '?wsdl';
const args = {
    "Request": {
        "Content-Type": "application/json",
        "API-key": process.env.MINDBODY_API_KEY,
        "SourceCredentials": {
            "SourceName": "OnePercentNutrition",
            "Password": "gj9RdLNeymPV7TK4kusMrzG7NYw=",
            "SiteIDs": {
                "int": -99
            },
        }
    },
    "UserCredentials": {
        "Username": "Siteowner",
        "Password": "apitest1234"
    }
};

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
            addClient(requiredFields);
        })
    });
}

const getExistingClient = async (email) => {
    const params = {...args};
    params.UserCredentials.Username = '_' + params.UserCredentials.Username;
    params['SearchText'] = email;
    console.log(params);
    soap.createClient(url + wsdl, (err, client) => {
        if (err) {
            throw err;
        }
        client.setEndpoint(url);
        client.GetClients(params, (err, result) => {
            if(err) {
                console.log(err);
            }
            console.log(result);
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
    soap.createClient(url + wsdl, (err, client) => {
        if (err) {
            throw err;
        }
        client.setEndpoint(url);
        client.AddOrUpdateClients(args, (err, result) => {
            if(err) {
                console.log(err);
            }
            console.log(JSON.stringify(result));
        })
    });
}

module.exports.getRequiredFields = getRequiredFields;
module.exports.addClient = addClient;  
module.exports.getExistingClient = getExistingClient;  