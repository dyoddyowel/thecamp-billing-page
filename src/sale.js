const soap = require('soap');
const base_url = "https://api.mindbodyonline.com/0_5_1/";
const apiUrl = "SaleService";
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

const getService = async () => {
    soap.createClient(url + wsdl, (err, client) => {
        if (err) {
            throw err;
        }
        client.setEndpoint(url);
        client.GetServices(args, (err, result) => {
            if(err) {
                console.log(err);
            }
            result.GetServicesResult.Services;
            console.log(result.GetServicesResult.Services);
        })
    });
}	

const print = async () => {
    let x = await getService();
}

const purchase = async (item, payments, clientID) => {
    let params =  {
          CartItems: item,
          Payments: {
              PaymentInfo: payments,
          },
          ClientID: clientID,
          Test: "true",
          ...args
      };

      soap.createClient(url + wsdl, (err, client) => {
        if (err) {
            throw err;
        }
        client.setEndpoint(url);
        client.CheckoutShoppingCart(args, (err, result) => {
            if(err) {
                console.log(err);
            }
            console.log(result.CheckoutShoppingCartResult);
        })
    });
}

let item = {
    CartItem: {
        Quantity: 1,
        Item: {
            ID: "1186"
        }
    }
}

let payments = {
    Amount: 65,
    CreditCardNumber: 777777777777,
    ExpMonth: 1,
    ExpYear: 2030,
    BillingName: "Michael Burnley",
    BillingAddress: "120 E Monterey Ave",
    BillingCity: "San Luis Obispo",
    BillingState: "CA",
    BillingPostalCode: 93401
}



module.exports.purchase = purchase;
module.exports.services = getService;
module.exports.print = print;