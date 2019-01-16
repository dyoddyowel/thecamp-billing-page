'use strict';

const moment = require('moment');
const nodemailer = require('nodemailer');
const postmarkTransport = require('nodemailer-postmark-transport');
let today = moment().endOf('day').format('MM-DD-YYYY');
const transport = nodemailer.createTransport(postmarkTransport({
    auth: {
        apiKey: '23f09270-adc1-4c7f-9cf5-0339e1c012b2'
    }
}))

const email = async (receiver) => {
    const mail = {
        from: 'no-reply@thecamptc.com',
        to: receiver,
        subject: "Thank you for your purchase.",
        templateId: 9819640,
        templateModel: {

            "product_name": "The Camp Training Center - Anaheim",
            "purchase_date": today,
            "product_url": "product_url_Value",
            "date": today,
            "receipt_details": [
                {
                    "description": "Tough Love Training Promo",
                    "amount": "$21"
                }
            ],
            "total": "$21",
            "company_name": "The Camp",
            "name": "name_Value",
            "receipt_id": "receipt_id_Value",
            "support_url": "support_url_Value",
        },
        attachments: [
            {
                filename: 'ToughLove_ValentinesNutritionTrainingPlan.pdf',
                path: '../emails/files/ToughLove_ValentinesNutritionTrainingPlan.pdf',
                contentType: 'application/pdf'
            }
        ]
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