const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const client = require('./src/client');
const sale = require('./src/sale');
const payment = require('./src/payment');

const port = process.env.PORT || 5000; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api', async (req, res) => {
  let body = req.body;
  let a = client.buildArguments();
  console.log(body);
  let client_data = {
    Email: req.body.Email,
    FirstName: req.body.Payment.name,
    LastName: req.body.Payment.name,
    AddressLine1: req.body.Address.BillingAddress,
    MobilePhone: '(909) 393-9075',
    BirthDate: 'October 31',
    IsMale: 'N/A'
  }
  console.log("Client Data", client_data);
  let clientResponse = await client.addClient(client_data);
  console.log("clientresponse", clientResponse);
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
