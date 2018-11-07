const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const client = require('./src/client');
const sale = require('./src/sale');
const payment = require('./src/payment');
const classes = require('./src/class');
const Email = require('email-templates');
const Infusionsoft = require('./src/infusionsoft');

const port = process.env.PORT || 5000; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/infusionsoft', async (req, res) => {
  let body = req.body;
  let name = body.Name.split(' ');
  let tag = body.TagID;
  let data = {
    "email_addresses": [{
        "email": body.Email,
        "field": "EMAIL1"
    }],
    "phone_numbers": [{
      "field": "PHONE1",
      "number": body.Phone
    }],
    "opt_in_reason": "Black Tie / Black Dress",
    "given_name": name[0],
    "family_name": name[1]
  }

  let updateResponse = await Infusionsoft.post(data, '/contacts');
  let tagParam = {
    "tagIds": [tag]
  };
  let contactURL = '/contacts/' + updateResponse['id'] + '/tags';
  let tagResponse = await Infusionsoft.post(tagParam, contactURL);
  res.send('contact endpoint');
})

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
    PostalCode: body.Address.BillingPostalCode,
    Gender: "Female",
    BirthDate: "2018-01-01",
    MobilePhone: body.Phone
  }
  // Add Client
  let clientResponse = await client.addClient(params, client_data);
  let month = exp[0];
  let year = exp[1].replace(' ','');
  if(year.length < 4) {
    year = '20' + year;
  } else {
    year = year;
  }
  let checkout_data = {
    CartItems: {
        CartItem: {
            Quantity: 1,
            Item: {
              attributes: {
                'xsi:type': "Service"
              },  
              ID: body.ProgramID
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
    ClientID: clientResponse[0]['ID'],
    Test: false
  }
  let saleParams = sale.buildArguments(body.SiteID);
  saleParams.Request['CartItems'] = checkout_data.CartItems;
  saleParams.Request['Payments'] = checkout_data.Payments;
  saleParams.Request['ClientID'] = checkout_data.ClientID;
  let purchase = await sale.purchase(saleParams);
});

// Serve any static files built by React
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports.sendEmail = sendEmail;