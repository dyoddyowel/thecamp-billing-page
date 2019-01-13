// Require:
var postmark = require("postmark");

// Send an email:
var client = new postmark.ServerClient("23f09270-adc1-4c7f-9cf5-0339e1c012b2");

client.sendEmail({
  "From": "no-reply@onepercentnutrition.com",
  "To": "michael@onepercentnutrition.com",
  "Subject": "Test",
  "TextBody": "Hello from Postmark!"
});