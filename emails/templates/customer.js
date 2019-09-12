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
                "description": "Fall Back Into Fitness 21-Day Detox",
                "amount": "$37"
            }
        ],
        "total": "$37",
        "company_name": "The Camp",
        "name": "name_Value",
        "receipt_id": "receipt_id_Value",
        "support_url": "support_url_Value",
    },
    attachments: [
        {
            filename: 'Fall-Back-Into-Fitness-21-Day-Detox-Manual.pdf',
            path: 'https://www.thecamptc.com/manuals/Fall-Back-Into-Fitness-21-Day-Detox-Manual.pdf',
            contentType: 'application/pdf'
        }
    ]
}

module.exports = template;
