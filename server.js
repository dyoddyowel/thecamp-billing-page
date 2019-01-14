const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const client = require('./src/client');
const send_email = require('./src/sendEmail');
const sale = require('./src/sale');
const payment = require('./src/payment');
const classes = require('./src/class');
const Infusionsoft = require('./src/infusionsoft');
const Timber = require('./src/timber');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/timber/list', async (req, res) => {
  let request = Timber.list()
  res.send(request);
});

//TODO: Write out create alert function for Timber
app.post('/api/timber/create', async (req, res) => {
  let params = {
    aggregate_function: "",
    condition: "",
    field_path: "",
    query: "",
    threshold: 0,
    window_seconds: 0
  }
  
  let request = Timber.createAlerts();
});

app.get('/email/send', async (req, res) => {
  send_email
});

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
      "number": body['Phone']
    }],
    "opt_in_reason": process.env.INFUSIONSOFT_OPTIN_REASON,
    "given_name": name[0],
    "family_name": name[1]
  }

  let updateResponse = await Infusionsoft.post(data, '/contacts');
  console.log("Infusionsoft client response", updateResponse);
  let tagParam = {
    "tagIds": [tag]
  };
  let contactURL = '/contacts/' + updateResponse['id'] + '/tags';
  let tagResponse = await Infusionsoft.post(tagParam, contactURL);
  console.log("Infusionsoft tag Response", tagResponse)
  res.send('contact endpoint');
})

app.post('/api/billing', async (req, res) => {
  console.log("at endpoint");
  let body = req.body;
  console.log("endpoint", body);
  let name = body.payment.name.split(' ');  
  let params = client.buildArguments(body.SiteID)
  let exp = body.payment.expiry.split('/');
  let phone;
  if(body.phone) {
    phone = body.phone;
  } else {
    phone = '9092879906';
  }
  let client_data = {
    Email: body.email,
    FirstName: body.fname,
    LastName: body.lname,
    AddressLine1: body.address.BillingAddress,
    City: body.address.BillingCity,
    State: body.address.BillingState,
    PostalCode: body.address.BillingPostalCode,
    Gender: "Female",
    BirthDate: "2018-01-01",
    MobilePhone: body.phone
  }

  console.log("client_data", client_data);

  // Add Client
  let clientResponse = await client.addClient(params, client_data);

  console.log("clientResponse", clientResponse);
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
        Amount: 21.0,
        CreditCardNumber: body.payment.number,
        CVV: body.payment.cvc,
        CCType: body.payment.issuer,
        ExpMonth: month,
        ExpYear: year,
        BillingName: body.payment.name,
        BillingAddress: body.address.BillingAddress,
        BillingCity: body.address.BillingCity,
        BillingState: body.address.BillingState,
        BillingPostalCode: body.address.BillingPostalCode,
        SaveInfo: true
      }
    },
    ClientID: clientResponse[0]['ID'],
  }
  let saleParams = sale.buildArguments(body.SiteID);
  saleParams.Request['CartItems'] = checkout_data.CartItems;
  saleParams.Request['Payments'] = checkout_data.Payments;
  saleParams.Request['ClientID'] = checkout_data.ClientID;
  let purchase = await sale.purchase(saleParams);
  console.log('purchase',purchase)
  res.send(purchase.Status);
});

app.post('/api', async (req, res) => {
  console.log("at endpoint");
  let body = req.body;
  console.log("endpoint", body);
  let name = body.Payment.name.split(' ');  
  let params = client.buildArguments(body.SiteID)
  let exp = body.Payment.expiry.split('/');
  let phone;
  if(body.phone) {
    phone = body.phone;
  } else {
    phone = '9092879906';
  }
  let client_data = {
    Email: body.Email,
    FirstName: fname,
    LastName: lname,
    AddressLine1: body.Address.BillingAddress,
    City: body.Address.BillingCity,
    State: body.Address.BillingState,
    PostalCode: body.Address.BillingPostalCode,
    Gender: "Female",
    BirthDate: "2018-01-01",
    MobilePhone: phone,
  }

  console.log("client_data", client_data);

  // Add Client
  let clientResponse = await client.addClient(params, client_data);

  console.log("clientResponse", clientResponse);
  let month = exp[0];
  let year = exp[1].replace(' ','');
  if(year.length < 4) {
    year = '20' + year;
  } else {
    year = year;
  }
  let checkout_data = {
    Test: 'true',
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
        Amount: 21.0,
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
  }
  let saleParams = sale.buildArguments(body.SiteID);
  saleParams.Request['CartItems'] = checkout_data.CartItems;
  saleParams.Request['Payments'] = checkout_data.Payments;
  saleParams.Request['ClientID'] = checkout_data.ClientID;
  let purchase = await sale.purchase(saleParams);

  res.send(purchase.Status);
});

// Serve any static files built by React
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static(path.join(__dirname, "admin/build")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.get("/admin", function(req, res) {
  res.sendFile(path.join(__dirname, "admin/build", "index.html"));
});
app.get("/admin/*", function(req, res) {
  res.sendFile(path.join(__dirname, "admin/build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));