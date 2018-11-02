const soap = require('soap');
const base_url = "https://api.mindbodyonline.com/0_5_1/";
const apiUrl = "PaymentService";
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

const paymentData = {
    "Amount": 89,
    "CreditCardNumber": 777777777777,
    "ExpMonth": 1,
    "ExpYear": 2018,
    "BillingName": "",
    "BillingAddress": "",
    "BillingCity": "",
    "BillingState": "",
    "BillingPostalCode": "",
};

const purchase = (purchaseData) => {
    return new Promise ((resolve, reject) => {
        soap.createClient(url + wsdl, (err, client) => {
            if (err) {
                throw err;
            }
            client.setEndpoint(url);
            client.GetRequiredClientFields(args, (err, result) => {
                if(err) {
                    console.log(err);
                }
                return resolve(result.GetRequiredClientFieldsResult.RequiredClientFields.string);
            })
        });
    });
}

module.exports.purchase = purchase;
module.exports.buildArguments = buildArguments;