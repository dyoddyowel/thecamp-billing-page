const soap = require('soap');
const base_url = "https://api.mindbodyonline.com/0_5_1/";
const apiUrl = "SiteService";
const url = base_url + '/' + apiUrl + '.asmx';
const wsdl = '?wsdl';
const args = {};

const buildArguments = (siteID) => {
    let params = {
        "Request": {
            "Content-Type": "application/json",
            "API-key": '90f5bb6381f34839b14e5e590a9e079f',
            "SourceCredentials": {
                "SourceName": "OnePercentNutrition",
                "Password": "gj9RdLNeymPV7TK4kusMrzG7NYw",
                "SiteIDs": {
                    "int": siteID
                }
            },
            "UserCredentials": {
                "SiteIDs": {
                    "int": siteID
                },
                "Username": "Alejandra@thecamptc.com",
                "Password": "fitness102"
            }
        }
    }
    return params;
}

const getLocations = (params) => {
    return new Promise ((resolve, reject) => {
        soap.createClient(url + wsdl, (err, client) => {
            if (err) {
                reject(err);
            }
            client.setEndpoint(url);
            client.GetLocations(params, (err, result) => {
                if(err) {
                    console.log(err);
                }
                return resolve(result.GetLocationsResult.Locations.Location);
            })
        });
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

const getActivationCode = () => {
    let params = {
      "Request": {
          "Content-Type": "application/json",
          "SourceCredentials": {
              "SourceName": "OnePercentNutrition",
              "Password": "gj9RdLNeymPV7TK4kusMrzG7NYw=",
              "SiteIDs": {
                  "int":  822381
              }
          }
      }
  }
    return new Promise ((resolve, reject) => {
        soap.createClient(url + wsdl, (err, client) => {
            if (err) {
                throw err;
            }
            client.setEndpoint(url);
            client.GetActivationCode(params, (err, result) => {
                if(err) {
                    console.log(err);
                }
                console.log(result.GetActivationCodeResult);
                return resolve(result.GetActivationCodeResult.ActivationLink);
            })
        });
    });
}

module.exports.getLocations = getLocations;
module.exports.buildArguments = buildArguments;
module.exports.getActivationCode = getActivationCode;
module.exports.looper = looper;

const locations = {
    'Anaheim': {
      siteID: '172426',
      programID: '10579',
      tagID: '2970',
      pixelID: '1019141084810848'
    },
    'Arcadia': {
      siteID: '505838',
      programID: '100115',
      tagID: '2972',
      pixelID: '170049590227137'
    },
    'Arlington': {
      siteID: '469848',
      programID: '10311',
      tagID: '2974',
      pixelID: '305596673130406'
    },
    'Bakersfield': {
      siteID: '539757',
      programID: '102103',
      tagID: '2976',
      pixelID: '124038588258655'
    },
    'Bell': {
      siteID: '273870',
      programID: '10537',
      tagID: '2978',
      pixelID: '1392379664110280'
    },
    'Burbank': {
      siteID: '264885',
      programID: '10779',
      tagID: '2980',
      pixelID: '179752492676186'
    },
    'Burnsville': {
      siteID: '441415',
      programID: '100025',
      tagID: '3076',
      pixelID: '114710455914412'
    },
    'Calexico': {
      siteID: '620570',
      programID: '100055',
      tagID: '2982',
      pixelID: '184828872165057'
    },
    'Carson': {
      siteID: '298511',
      programID: '10295',
      tagID: '2984',
      pixelID: '629338977239817'
    },
    'Chatsworth': {
      siteID: '3324',
      programID: '10462',
      tagID: '2986',
      pixelID: '232332683767377'
    },
    'Chino': {
      siteID: '143922',
      programID: '11019',
      tagID: '2988',
      pixelID: '167030490317149'
    },
    'Chula-Vista': {
      siteID: '248377',
      programID: '10275',
      tagID: '2990',
      pixelID: '790293257759624'
    },
    'Clearwater': {
      siteID: '698580',
      programID: '10262',
      tagID: '2992',
      pixelID: '1607758422866893'
    },
    'Clovis': {
      siteID: '569158',
      programID: '100012',
      tagID: '2994',
      pixelID: '443104559460326'
    },
    'Colorado-Springs': {
      siteID: '735761',
      programID: '10239',
      tagID: '2996',
      pixelID: '1827599617282096'
    },
    'Corona': {
      siteID: '233',
      programID: '10296',
      tagID: '2998',
      pixelID: '1637219743219021'
    },
    'Costa-Mesa': {
      siteID: '221376',
      programID: '10295',
      tagID: '3000',
      pixelID: '1498666200434441'
    },
    'Cypress': {
      siteID: '278263',
      programID: '10389',
      tagID: '3002',
      pixelID: '1519484671436681'
    },
    'Davie': {
      siteID: '257960',
      programID: '10257',
      tagID: '3004',
      pixelID: '1233063763400170'
    },
    'Downey': {
      siteID: '273870',
      programID: '10538',
      tagID: '3006',
      pixelID: '217952465433234'
    },
    'Draper': {
      siteID: '414648',
      programID: '10313',
      tagID: '3008',
      pixelID: '1021015971343875'
    },
    'East-Los-Angeles': {
      siteID: '253486',
      programID: '10525',
      tagID: '3010',
      pixelID: '502979696725875'
    },
    'El-Cajon': {
      siteID: '347909',
      programID: '10254',
      tagID: '3012',
      pixelID: '1704768576475182'
    },
    'El-Monte': {
      siteID: '264885',
      programID: '10779',
      tagID: '3014',
      pixelID: '304156889944115'
    },
    'Escondido': {
      siteID: '581912',
      programID: '101048',
      tagID: '3016',
      pixelID: '236536443725886'
    },
    'Fontana': {
      siteID: '143931',
      programID: '10954',
      tagID: '3018',
      pixelID: '1709686075934137'
    },
    'Fort-Worth': {
      siteID: '834435',
      programID: '10445',
      tagID: '3020',
      pixelID: '581110525408697'
    },
    'Fresno': {
      siteID: '-724509',
      programID: '10225',
      tagID: '3022',
      pixelID: '1097520526963386'
    },
    'Galerias-Mexicali': {
      siteID: '620570',
      programID: '100055',
      tagID: '2982',
      pixelID: '184828872165057'
    },
    'Gilbert': {
      siteID: '589611',
      programID: '10501',
      tagID: '3026',
      pixelID: '102630910139915'
    },
    'Hemet': {
      siteID: '-291840',
      programID: '10597',
      tagID: '3028',
      pixelID: '180504269026514'
    },
    'High-Desert': {
      siteID: '191573',
      programID: '10416',
      tagID: '3030',
      pixelID: '950149455114779'
    },
    'Highland-Hts': {
      siteID: '912776',
      programID: '10314',
      tagID: '3032',
      pixelID: '214610925646835'
    },
    'Houston': {
      siteID: '-879013',
      programID: '10306',
      tagID: '3034',
      pixelID: '1759347007673390'
    },
    'Humble': {
      siteID: '682932',
      programID: '101076',
      tagID: '3036',
      pixelID: '1506912086015394'
    },
    'Huntington-Beach': {
      siteID: '441683',
      programID: '10306',
      tagID: '3038',
      pixelID: '690039124493757'
    },
    'Inglewood': {
      siteID: '740074',
      programID: '101098',
      tagID: '3040',
      pixelID: ''
    },
    'Irvine': {
      siteID: '228344',
      programID: '10302',
      tagID: '3042',
      pixelID: '202296960104506'
    },
    'Jacksonville': {
      siteID: '715841',
      programID: '10322',
      tagID: '3044',
      pixelID: '557649144436734'
    },
    'Kearny-Mesa': {
      siteID: '528419',
      programID: '10269',
      tagID: '3046',
      pixelID: '1066569990107494'
    },
    'La-Mirada': {
      siteID: '273870',
      programID: '10539',
      tagID: '3048',
      pixelID: '865635570238443'
    },
    'La-Puente': {
      siteID: '136390',
      programID: '10227',
      tagID: '3050',
      pixelID: '1206137436117440'
    },
    'Laguna': {
      siteID: '221032',
      programID: '10286',
      tagID: '3052',
      pixelID: '1616589368601882'
    },
    'Lake-Elsinore': {
      siteID: '963',
      programID: '10303',
      tagID: '3054',
      pixelID: '298612120501198'
    },
    'Lake-Forest': {
      siteID: '274470',
      programID: '10297',
      tagID: '3056',
      pixelID: '834850809966768'
    },
    'Lancaster': {
      siteID: '149049',
      programID: '10602',
      tagID: '3058',
      pixelID: '570550286429829'
    },
    'Long-Beach': {
      siteID: '245950',
      programID: '10337',
      tagID: '3060',
      pixelID: '284755885244880'
    },
    'Los-Angeles': {
      siteID: '300527',
      programID: '10198',
      tagID: '3062',
      pixelID: '1588871628082432'
    },
    'Mckinney': {
      siteID: '568503',
      programID: '100064',
      tagID: '3066',
      pixelID: '100999890735467'
    },
    'Menifee': {
      siteID: '228342',
      programID: '10297',
      tagID: '3068',
      pixelID: '729269550536661'
    },
    'Mesa': {
      siteID: '497618',
      programID: '11408',
      tagID: '3070',
      pixelID: '1171352239584784'
    },
    'Mid-Cities': {
      siteID: '764893',
      programID: '10238',
      tagID: '3064',
      pixelID: '348754418816841'
    },
    'Mid-Phoenix': {
      siteID: '',
      programID: '',
      tagID: '3072',
      pixelID: '255726251957862'
    },
    'Milwaukie': {
      siteID: '707289',
      programID: '10322',
      tagID: '3074',
      pixelID: '258700047862625'
    },
    'Miramar': {
      siteID: '347920',
      programID: '10235',
      tagID: '3078',
      pixelID: '1780136635595797'
    },
    'Modesto': {
      siteID: '289688',
      programID: '11259',
      tagID: '3080',
      pixelID: '1809269429345293'
    },
    'Monrovia': {
      siteID: '264885',
      programID: '10779',
      tagID: '3082',
      pixelID: '859360710884359'
    },
    'Monterey': {
      siteID: '522220',
      programID: '103089',
      tagID: '3084',
      pixelID: '123639311553358'
    },
    'Moreno-Valley': {
      siteID: '276772',
      programID: '10655',
      tagID: '3086',
      pixelID: '644440305695752'
    },
    'North-Dallas': {
      siteID: '837070',
      programID: '10296',
      tagID: '3088',
      pixelID: '1109302805771569'
    },
    'Northridge': {
      siteID: '264885',
      programID: '10779',
      tagID: '3090',
      pixelID: '1065579676890664'
    },
    'Oceanside': {
      siteID: '192329',
      programID: '10288',
      tagID: '3092',
      pixelID: '1032706200115435'
    },
    'Orlando': {
      siteID: '783641',
      programID: '101046',
      tagID: '3094',
      pixelID: '572983156376794'
    },
    'Oxnard': {
      siteID: '241280',
      programID: '10603',
      tagID: '3096',
      pixelID: '715749745222123'
    },
    'Palm-Desert': {
      siteID: '726432',
      programID: '10620',
      tagID: '3098',
      pixelID: '1384696064894963'
    },
    'Parma': {
      siteID: '906879',
      programID: '100064',
      tagID: '3100',
      pixelID: '1859650491026218'
    },
    'Pasadena': {
      siteID: '228343',
      programID: '10282',
      tagID: '3102',
      pixelID: '1488116264831509'
    },
    'Peoria': {
      siteID: '748408',
      programID: '103067',
      tagID: '3104',
      pixelID: '710745515776286'
    },
    'Perris': {
      siteID: '963',
      programID: '10304',
      tagID: '3106',
      pixelID: '1376592035703737'
    },
    'Phoenix': {
      siteID: '-314525',
      programID: '10311',
      tagID: '3108',
      pixelID: '1770134646607862'
    },
    'Pico-Riveria': {
      siteID: '253486',
      programID: '10525',
      tagID: '3110',
      pixelID: '361117030943073'
    },
    'Pittsburgh': {
      siteID: '953792', 
      programID: '10256',
      tagID: '',
      pixelID: '1148149108603193'
    },
    'Rancho': {
      siteID: '143922',
      programID: '11019',
      tagID: '3112',
      pixelID: '537817659718392'
    },
    'Redlands': {
      siteID: '143945',
      programID: '10690',
      tagID: '3114',
      pixelID: '543908882440319'
    },
    'Richardson': {
      siteID: '353209',
      programID: '10280',
      tagID: '3116',
      pixelID: '1783046898576146'
    },
    'Riverside': {
      siteID: '143948',
      programID: '10665',
      tagID: '3118',
      pixelID: '169121226772891'
    },
    'Round-Rock': {
      siteID: '637731',
      programID: '100064',
      tagID: '3120',
      pixelID: '1257949390955326'
    },
    'San-Antonio': {
      siteID: '442521',
      programID: '10290',
      tagID: '3122',
      pixelID: '1368589546514574'
    },
    'San-Bernardino': {
      siteID: '663134',
      programID: '101103',
      tagID: '3124',
      pixelID: '1819556708336589'
    },
    'San-Dimas': {
      siteID: '274359',
      programID: '10327',
      tagID: '3126',
      pixelID: '590422501159367'
    },
    'San-Fernando': {
      siteID: '264885',
      programID: '10779',
      tagID: '3128',
      pixelID: '110603422949518'
    },
    'San-Jose': {
      siteID: '461323',
      programID: '102095',
      tagID: '3130',
      pixelID: '198854660663457'
    },
    'San-Juan-Capistrano': {
      siteID: '819476',
      programID: '100041',
      tagID: '3132',
      pixelID: ''
    },
    'San-Marcos': {
      siteID: '',
      programID: '',
      tagID: '',
      pixelID: ''
    },
    'Santa-Ana': {
      siteID: '542643',
      programID: '10283',
      tagID: '3134',
      pixelID: '532712983583835'
    },
    'Santa-Barbara': {
      siteID: '420012',
      programID: '100048',
      tagID: '3136',
      pixelID: '330218127449864'
    },
    'Santa-Clarita': {
      siteID: '264885',
      programID: '10779',
      tagID: '3138',
      pixelID: '517065911823415'
    },
    'Santa-Maria': {
      siteID: '570071',
      programID: '100046',
      tagID: '3140',
      pixelID: '147429615840642'
    },
    'Sarasota': {
      siteID: '525810',
      programID: '10229',
      tagID: '3142',
      pixelID: '186078748546265'
    },
    'Silverlake': {
      siteID: '833754',
      programID: '101020',
      tagID: '3144',
      pixelID: '257137454755106'
    },
    'Simi-Valley': {
      siteID: '712144',
      programID: '101136',
      tagID: '3146',
      pixelID: '1387910067916364'
    },
    'South-Fort-Worth': {
      siteID: '761241',
      programID: '100053',
      tagID: '3150',
      pixelID: '111617952875370'
    },
    'Stockton': {
      siteID: '994773',
      programID: '101237',
      tagID: '3152',
      pixelID: '1632174066878929'
    },
    'Sunrise': {
      siteID: '694338',
      programID: '11271',
      tagID: '3154',
      pixelID: '178792489188524'
    },
    'Surprise': {
      siteID: '863734',
      programID: '10257',
      tagID: '3156',
      pixelID: '1442882522443881'
    },
    'Suwanee': {
      siteID: '402019',
      programID: '10368',
      tagID: '3158',
      pixelID: '375424522797187'
    },
    'Temecula': {
      siteID: '142187',
      programID: '10973',
      tagID: '3160',
      pixelID: '835739866538821'
    },
    'Thousand-Oaks': {
      siteID: '198685',
      programID: '10618',
      tagID: '3162',
      pixelID: '1645451662401303'
    },
    // 'Tijuana/Zona-Rio': {
    //   siteID: '551868',
    //   programID: '',
    //   tagID: '',
    //   pixelID: '2214050265485861'
    // },
    'Torrance': {
      siteID: '298511',
      programID: '10295',
      tagID: '2984',
      pixelID: '629338977239817'
    },
    'Van-Nuys': {
      siteID: '264885',
      programID: '10779',
      tagID: '3166',
      pixelID: '161534471052927'
    },
    'Vancouver': {
      siteID: '477491',
      programID: '',
      tagID: '3164',
      pixelID: '1484007911626110'
    },
    'Ventura': {
      siteID: '633911',
      programID: '103175',
      tagID: '3168',
      pixelID: '1157707830943587'
    },
    'West-Chula-Vista': {
      siteID: '616363',
      programID: '10284',
      tagID: '3170',
      pixelID: '1091436784259053'
    },
    'West-Covina': {
      siteID: '264885',
      programID: '10779',
      tagID: '3172',
      pixelID: '350962948626111'
    },
    'Westminster': {
      siteID: '275479',
      programID: '10367',
      tagID: '3174',
      pixelID: '1762087010724053'
    },
    'Wheeling': {
      siteID: '909945',
      programID: '100060',
      tagID: '3176',
      pixelID: '1684887368479739'
    },
    'Woodland-Hills': {
      siteID: '345827',
      programID: '10599',
      tagID: '3178',
      pixelID: '575083292684462'
    },
    'Zona-Dorada-Mexicali': {
      siteID: '620570',
      programID: '100055',
      tagID: '2982',
      pixelID: '184828872165057'
    },
  }