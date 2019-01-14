// Require:
var postmark = require("postmark");

// Send an email:
var client = new postmark.ServerClient("23f09270-adc1-4c7f-9cf5-0339e1c012b2");

client.sendEmail({
  "From": "no-reply@thecamptc.com",
  "To": "jowel@thecamptc.com",
  "Subject": "Test Email",
  "TextBody": "Hello from Postmark!"
});