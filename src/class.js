const soap = require('soap');
const base_url = "https://api.mindbodyonline.com/0_5_1/";
const apiUrl = "ClassService";
const url = base_url + '/' + apiUrl + '.asmx';
const wsdl = '?wsdl';
const args = {};

const buildArguments = (siteID) => {
    let params = {
        "Request": {
            "Content-Type": "application/json",
            "API-key": process.env.MINDBODY_API_KEY,
            "SourceCredentials": {
                "SourceName": process.env.MINDBODY_SOURCE_NAME,
                "Password": process.env.MINDBODY_PASSWORD,
                "SiteIDs": {
                    "int": siteID
                }
            },
            "UserCredentials": {
                "SiteIDs": {
                    "int": siteID
                },
                "Username": process.env.MINDBODY_STAFF_USER,
                "Password": process.env.MINDBODY_STAFF_PASSWORD
            }
        }
    }
    return params;
}

const getClasses = (params) => {
        return new Promise ((resolve, reject) => {
            soap.createClient(url + wsdl, (err, client) => {
                if (err) {
                    throw err;
                }
                client.setEndpoint(url);
                client.GetClasses(params, (err, result) => {
                    if(err) {
                        console.log(err);
                    }
                    return resolve(result.GetClassesResult.Classes);
                })
            });
        });
}

const getCourses = (params) => {
    return new Promise ((resolve, reject) => {
        soap.createClient(url + wsdl, (err, client) => {
            if (err) {
                throw err;
            }
            client.setEndpoint(url);
            await client.GetCourses(params, (err, result) => {
                if(err) {
                    console.log(err);
                }
                return resolve(result.GetCoursesResult.Classes);
            })
        });
    });
}

const addClientToClass = (params) => {
    return new Promise ((resolve, reject) => {
        soap.createClient(url + wsdl, (err, client) => {
            if (err) {
                throw err;
            }
            client.setEndpoint(url);
            client.AddClientsToClass(params, (err, result) => {
                if(err) {
                    console.log(err);
                }
                return resolve(result.AddClientsToClassResult);
            })
        });
    });
}

module.exports.getClasses = getClasses;
module.exports.addClientToClass = addClientToClass;
module.exports.buildArguments = buildArguments;
module.exports.getCourses = getCourses;