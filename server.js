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
  console.log("body", body);
  let name = body.Payment.name.split(' ');
  let client_data = {
    Email: body.Email,
    FirstName: name[0],
    LastName: name[1],
    AddressLine1: body.Address.BillingAddress,
    City: body.Address.BillingCity,
    State: body.Address.BillingState,
    PostalCode: body.Address.BillingPostalCode
  }
  
  let params = client.buildArguments(body.SiteID)
  // Add Client
  let clientResponse = await client.addClient(params, client_data);
  console.log("Client", clientResponse);

  let checkout_data = {
      Test: "false",
      CartItems: {
          CartItem: {
              Quantity: 1,
              Item: {
                  ID: 11020
                }
              }
            },
            Payments: {
                PaymentInfo: body.Payment,
                ...body.Address
              }
  }
  let exp = body.Payment.expiry.split('/');
  checkout_data.Payments.PaymentInfo['ExpMonth'] = exp[0];
  checkout_data.Payments.PaymentInfo['ExpYear'] = exp[1];
  checkout_data['ClientID'] = clientResponse[0]['ID'];
  console.log('checkout_data', checkout_data)
  let saleParams = sale.buildArguments(body.SiteID);
  let purchase = await sale.purchase(saleParams, checkout_data)
  console.log("purchase data", purchase);
  // Get Existing Client
  // let clients = await client.getExistingClient(params, client_data.Email);
  // Get Required Fields
  // let requiredFields = await client.getRequiredFields(params);
  // let services = await sale.getService(serviceParams)

  // console.log("services working?", services);
  // let params = classes.buildArguments(body.SiteID);
  // let getClasses = await classes.getClasses(params);
  // console.log("class response", clients);
  // sale.services();
  // payment.purchase();
  res.send('payment endpoint');
});

// Serve any static files built by React
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
