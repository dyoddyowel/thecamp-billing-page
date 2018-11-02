const soap = require('soap');
const base_url = "https://api.mindbodyonline.com/0_5_1/";
const apiUrl = "SiteService";
const url = base_url + '/' + apiUrl + '.asmx';
const wsdl = '?wsdl';
const args = {
    "Request": {
        "Content-Type": "application/json",
        "API-key": process.env.MINDBODY_API_KEY,
        "SourceCredentials": {
            "SourceName": "OnePercentNutrition",
            "Password": "gj9RdLNeymPV7TK4kusMrzG7NYw=",
            "SiteIDs": {
                "int": 143922
                // "int": -99
            }
        },
        "UserCredentials": {
            // "Username": "Siteowner",
            // "Password": "apitest1234",
            "SiteIDs": {
                "int": 143922
                // "int": -99
            },
            "Username": "Alejandra@thecamptc.com",
            "Password": "fitness102"
        }
    }
};

const getLocations = async (params) => {
  soap.createClient(url + wsdl, (err, client) => {
      if (err) {
          throw err;
      }
      client.setEndpoint(url);
      client.GetLocations(args, (err, result) => {
          if(err) {
              console.log(err);
          }
          // let requiredFields = convertToObject(result.GetRequiredClientFieldsResult.RequiredClientFields.string);
          // addClient(requiredFields);
          let x = result.GetLocationsResult.Locations.Location;
          for (let index = 0; index < x.length; index++) {
            const element = x[index];
            console.log(element);
          }
          // console.log(result.GetLocationsResult.Locations.Location)
      })
  });
}

module.exports.getLocations = getLocations;