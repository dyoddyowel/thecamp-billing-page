const moment = require('moment');
let today = moment().endOf('day').format('MM-DD-YYYY');

const template = {
    templateId: process.env.POSTMARK_CUSTOMER_TEMPLATE,
    templateModel: {

        "product_name": "The Camp Transformation Center",
        "purchase_date": today,
        "product_url": "product_url_Value",
        "date": today,
        "receipt_details": [
            {
                "description": "21 Day Summer Shred Promo",
                "amount": "$47"
            }
        ],
        "total": "$47",
        "company_name": "The Camp",
        "name": "name_Value",
        "receipt_id": "receipt_id_Value",
        "support_url": "support_url_Value",
    },
    attachments: [
        {
            filename: 'SpringCleaningDetoxManual2019.pdf',
            path: 'http://www.thecamptc.com/manuals/SpringCleaningDetoxManual2019.pdf',
            contentType: 'application/pdf'
        }
    ]
}

module.exports = template;