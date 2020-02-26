const moment = require('moment');
let today = moment().endOf('day').format('MM-DD-YYYY');

const template = {
    templateId: process.env.POSTMARK_ADMIN_TEMPLATE,
    templateModel: {

        "product_name": "The Camp Transformation Center",
        "purchase_date": today,
        "product_url": "product_url_Value",
        "date": today,
        "receipt_details": [
            {
                "description": "Spring Cleaning Detox",
                "amount": "$67"
            }
        ],
        "total": "$67",
        "company_name": "The Camp",
        "name": "name_Value",
        "receipt_id": "receipt_id_Value",
        "support_url": "support_url_Value",
    },
    attachments: [
        {
            filename: 'Spring-Cleaning-Detox-Manual.pdf',
            path: 'https://www.thecamptc.com/manuals/Spring-Cleaning-Detox-Manual.pdf',
            contentType: 'application/pdf'
        }
    ]
}

module.exports = template;
