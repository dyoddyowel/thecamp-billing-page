const soap = require('./soapClient');
const service = "SaleService";
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
        }
    }
    return params;
}

const getService = (params) => {
    let client = await soap(service);
    return new Promise ((resolve, reject) => {
        client.GetServices(params, (err, result) => {
            if(err) {
                console.log(err);
            }
            return resolve(result['GetServicesResult']['Services']);
        });
    });
}	

const purchase = (params) => {
    let client = await soap(service);
    return new Promise ((resolve, reject) => {
        client.CheckoutShoppingCart(params, (err, result) => {
            if(err) {
                console.log("error", err);
            }
            return resolve(result.CheckoutShoppingCartResult);
        })
    });
}

module.exports.purchase = purchase;
module.exports.getService = getService;
module.exports.buildArguments = buildArguments;