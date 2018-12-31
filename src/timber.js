const Client = require('node-rest-client').Client;
const client = new Client();
const base_url = "https://api.timber.io";
const URLS = {
    alerts: base_url + "/alerts"
}

let header = {
    "Authorization": "Bearer " + process.env.TIMBER_API_KEY
}


const listAlerts = () => {
    return new Promise((resolve, reject) => {
        return client.get(URLS['alerts'], header, (data, response) => {
            return resolve(data);
        })
    })
}

const getAlert = (alert_id) => {
    return new Promise((resolve, reject) => {
        return client.get(URLS['alerts'] + '/' + alert_id, header, (data, response) => {
            return resolve(data);
        })
    })
}

const createAlerts = () => {

}

const updateAlerts = () => {

}

module.exports = {
    get: getAlert,
    create: createAlerts,
    update: updateAlerts,
    list: listAlerts
}