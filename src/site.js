const soap = require('soap');
const base_url = "https://api.mindbodyonline.com/0_5_1/";
const apiUrl = "SiteService";
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

const getLocations = (params) => {
    return new Promise ((resolve, reject) => {
        soap.createClient(url + wsdl, (err, client) => {
            if (err) {
                throw err;
            }
            client.setEndpoint(url);
            client.GetLocations(params, (err, result) => {
                if(err) {
                    console.log(err);
                }
                return resolve(result.GetLocationsResult.Locations.Location);
            })
        });
    });
}

const getActivationCode = (params) => {
    return new Promise ((resolve, reject) => {
        soap.createClient(url + wsdl, (err, client) => {
            if (err) {
                throw err;
            }
            client.setEndpoint(url);
            client.GetActivationCode(params, (err, result) => {
                if(err) {
                    console.log(err);
                }
                return resolve(result.GetActivationCodeResult.ActivationCode);
            })
        });
    });
}

module.exports.getLocations = getLocations;
module.exports.buildArguments = buildArguments;
module.exports.getActivationCode = getActivationCode;