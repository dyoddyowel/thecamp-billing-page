'use strict';

const nodemailer = require('nodemailer');
const postmarkTransport = require('nodemailer-postmark-transport');
console.log(process.env.POSTMARK_CLIENT_API)
const transport = nodemailer.createTransport(postmarkTransport({
    auth: {
        apiKey: process.env.POSTMARK_CLIENT_API
    }
}))

const email = async (receiver, template) => {
    const mail = {
        from: 'no-reply@thecamptc.com',
        to: receiver,
        subject: "Thank you for your purchase.",
        ...template
    }

    transport.sendMail(mail, (err, info) => {
        if (err) {
            console.error(err);
          } else {
            console.log(info);
          }
    })
}

module.exports = email;