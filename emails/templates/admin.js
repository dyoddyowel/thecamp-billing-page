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
            path: 'http://www.thecamptc.com/manuals/ValentinesNutritionTrainingPlan.pdf',
            contentType: 'application/pdf'
        }
    ]
}

module.exports = template;