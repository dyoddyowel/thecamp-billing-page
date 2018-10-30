const rest = require('./restClient');
const api_url = "http://clients.mindbodyonline.com/api/0_5_1"

const args = {
    headers: {
        "Content-Type": "application/json",
        "API-key": process.env.MINDBODY_API_KEY,
        "SiteId": process.env.MINDBODY_SITE_ID
    },
};

module.exports = class Client {
    constructor() {
        this.firstName = "",
        this.lastName = "",
        this.email = "",
        this.phone = ""
    }

    getRequiredFields

}