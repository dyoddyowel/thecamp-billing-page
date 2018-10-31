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
            }
        }
    },
    "UserCredentials": {
        "Username": "Siteowner",
        "Password": "apitest1234"
    }
};

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
    soap.createClient(url + wsdl, (err, client) => {
        if (err) {
            throw err;
        }
        client.setEndpoint(url);
        client.GetRequiredClientFields(args, (err, result) => {
            if(err) {
                console.log(err);
            }
            addClient(result.GetRequiredClientFieldsResult.RequiredClientFields.string, args);
        })
    });
}

module.exports.purchase = purchase;