const soap = require('./soapClient');
const service = "SiteService";
const args = {};

const buildArguments = (siteID) => {
    let params = {
        "Request": {
            "Content-Type": "application/json",
            "SourceCredentials": {
                "SourceName": process.env.MINDBODY_SOURCE_NAME,
                "Password": process.env.MINDBODY_PASSWORD,
                "SiteIDs": {
                    "int":  siteID
                }
            }
        }
    }
    return params;
}

const getLocations = async (params) => {
    let client = await soap(service);
    return new Promise ((resolve, reject) => {
        client.GetLocations(params, (err, result) => {
            if(err) {
                console.log(err);
            }
            return resolve(result.GetLocationsResult.Locations.Location);
        })
    });
}

const looper = async () => {
    let new_obj = {};
    for(let sobj in locations) {
        // let key = Object.keys(sobj);
        let t = buildArguments(locations[sobj]['siteID']);
        let x = await getActivationCode(t);
        new_obj[sobj] = x;
    }
    return new_obj;
}

const getActivationCode = (params) => {
    let client = await soap(service);
    return new Promise ((resolve, reject) => {
        client.GetActivationCode(params, (err, result) => {
            if(err) {
                console.log(err);
            }
            console.log(result.GetActivationCodeResult);
            return resolve(result.GetActivationCodeResult.ActivationLink);
        })

    });
}

module.exports.getLocations = getLocations;
module.exports.buildArguments = buildArguments;
module.exports.getActivationCode = getActivationCode;
module.exports.looper = looper;