const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const client = require('./src/client');
const sale = require('./src/sale');
const payment = require('./src/payment');
const classes = require('./src/class');

const port = process.env.PORT || 5000; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api', async (req, res) => {
  let body = req.body;
  let name = body.Payment.name.split(' ');  
  let params = client.buildArguments(body.SiteID)
  let exp = body.Payment.expiry.split('/');
  let client_data = {
    Email: body.Email,
    FirstName: name[0],
    LastName: name[1],
    AddressLine1: body.Address.BillingAddress,
    City: body.Address.BillingCity,
    State: body.Address.BillingState,
    PostalCode: body.Address.BillingPostalCode
  }
  // Add Client
  let clientResponse = await client.addClient(params, client_data);
  let month = exp[0];
  let year = '20' + exp[1].replace(' ','');
  let checkout_data = {
    CartItems: {
        CartItem: {
            Quantity: 1,
            Item: {
              attributes: {
                'xsi:type': "Service"
              },  
              ID: 10579
            }
        }
    },
    Payments: {
      PaymentInfo: {
        attributes: {
          'xsi:type': "CreditCardInfo"
        },  
        Amount: 97.0,
        CreditCardNumber: body.Payment.number,
        CVV: body.Payment.cvc,
        ExpMonth: month,
        ExpYear: year,
        BillingName: body.Payment.name,
        BillingAddress: body.Address.BillingAddress,
        BillingCity: body.Address.BillingCity,
        BillingState: body.Address.BillingState,
        BillingPostalCode: body.Address.BillingPostalCode,
        SaveInfo: true
      }
    },
    ClientID: clientResponse[0]['ID']
  }
  let saleParams = sale.buildArguments(body.SiteID);
  saleParams.Request['CartItems'] = checkout_data.CartItems;
  saleParams.Request['Payments'] = checkout_data.Payments;
  saleParams.Request['ClientID'] = checkout_data.ClientID;
  let purchase = await sale.purchase(saleParams);
  console.log("purchase data", purchase);
  res.send('payment endpoint');
});

// Serve any static files built by React
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
