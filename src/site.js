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
            "API-key": '90f5bb6381f34839b14e5e590a9e079f',
            "SourceCredentials": {
                "SourceName": "OnePercentNutrition",
                "Password": "gj9RdLNeymPV7TK4kusMrzG7NYw",
                "SiteIDs": {
                    "int": siteID
                }
            },
            "UserCredentials": {
                "SiteIDs": {
                    "int": siteID
                },
                "Username": "Alejandra@thecamptc.com",
                "Password": "fitness102"
            }
        }
    }
    return params;
}

const getLocations = (params) => {
    return new Promise ((resolve, reject) => {
        soap.createClient(url + wsdl, (err, client) => {
            if (err) {
                reject(err);
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

const looper = async () => {
    let new_obj = {};
    for(let sobj in locations) {
        // let key = Object.keys(sobj);
        let t = buildArguments(locations[sobj]['siteID']);
        let x = await getActivationCode(t);
        new_obj[sobj] = x;
    }
    return new_obj;
}

const getActivationCode = () => {
    let params = {
      "Request": {
          "Content-Type": "application/json",
          "SourceCredentials": {
              "SourceName": "OnePercentNutrition",
              "Password": "gj9RdLNeymPV7TK4kusMrzG7NYw=",
              "SiteIDs": {
                  "int":  264885
              }
          }
      }
  }
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
                console.log(result.GetActivationCodeResult);
                return resolve(result.GetActivationCodeResult.ActivationLink);
            })
        });
    });
}

module.exports.getLocations = getLocations;
module.exports.buildArguments = buildArguments;
module.exports.getActivationCode = getActivationCode;
module.exports.looper = looper;