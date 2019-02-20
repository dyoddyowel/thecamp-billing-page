// Require:
var postmark = require("postmark");

// Send an email:
var client = new postmark.ServerClient(process.env.POSTMARK_CLIENT_API);

client.sendEmail({
  "From": "no-reply@thecamptc.com",
  "To": "jowel@thecamptc.com",
  "Subject": "Test Email",
  "TextBody": "Hello from Postmark!"
});