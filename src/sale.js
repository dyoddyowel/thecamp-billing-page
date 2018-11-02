const soap = require('soap');
const base_url = "https://api.mindbodyonline.com/0_5_1/";
const apiUrl = "SaleService";
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

const getService = (params) => {
    return new Promise ((resolve, reject) => {
        soap.createClient(url + wsdl, (err, client) => {
            if (err) {
                throw err;
            }
            client.setEndpoint(url);
            client.GetServices(params, (err, result) => {
                if(err) {
                    console.log(err);
                }
                return resolve(result.GetServicesResult.Services);
            })
        });
    });
}	

const purchase = (params, item) => {
        return new Promise ((resolve, reject) => {
            soap.createClient(url + wsdl, (err, client) => {
              if (err) {
                  throw err;
              }
              client.setEndpoint(url);
              client.CheckoutShoppingCart(args, (err, result) => {
                  if(err) {
                      console.log(err);
                  }
                  return resolve(result.CheckoutShoppingCartResult);
              })
          });
        });
}

module.exports.purchase = purchase;
module.exports.services = getService;
module.exports.buildArguments = buildArguments;