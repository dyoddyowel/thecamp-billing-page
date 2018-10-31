import React, { Component } from 'react';

class LocationList extends Component {
    constructor() {
        super();
        this.state = {};
    }

    renderLocations(options) {
        let keys = Object.keys(options);
        let values = Object.values(options);
        let arr = [];
        for(let i of keys.keys()) {
            let x = <option value={values[i]}>{keys[i]}</option>
            arr.push(x);
        }
        return arr;
    }

    render() {
        return(
            <div>
                <h2>Locations</h2>
                <select>
                    {
                        this.renderLocations(locations)
                    }
                </select>
            </div>
        );
    }
}

const locations = {
    'Anaheim, CA': '172426',
    'Arcadia, AZ': '505838',
    'Arlington (Grand Prairie), TX': '469848',
    'Bakersfield, CA': '539757',
    'Bell, CA': '273870',
    'Burbank, CA': '264885',
    'Burnsville, MN': '441415',
    'Calexico, CA': '620570',
    'Carson, CA': '298511',
    'Chatsworth, CA': '3324',
    'Chino, CA': '143922',
    'Chula Vista, CA': '248377',
    'Clearwater, FL': '698580',
    'Clovis, CA': '569158',
    'Colorado Springs, CO': '735761',
    'Corona, CA': '233',
    'Costa Mesa, CA': '221376',
    'Cypress, CA': '278263',
    'Davie, FL': '257960',
    'Downey, CA  ': '273870',
    'Draper, UT': '414648',
    'East Los Angels, CA': '253486',
    'El Cajon, CA': '347909',
    'El Monte, CA': '264885',
    'Escondido, CA': '581912',
    'Fontana, CA': '143931',
    'Fort Worth, TX': '834435',
    'Fresno, CA': '-724509',
    'Galerias Mexicali, MEX': '524525',
    'Gilbert, AZ': '589611',
    'Hemet, CA': '-291840',
    'High Desert (Hesperia), CA': '191573',
    'Highland Hts, OH': '912776',
    'Houston, TX': '-879013',
    'Humble, TX': '682932',
    'Huntington Beach, CA': '441683',
    'Inglewood, CA': '740074',
    'Irvine, CA': '228344',
    'Jacksonville, FL': '715841',
    'Kearny Mesa, CA': '528419',
    'La Mirada, CA': '273870',
    'La Puente, CA': '136390',
    'Laguna, CA': '221032',
    'Lake Elsinore, CA': '963',
    'Lake Forest, CA': '274470',
    'Lancaster, CA': '149049',
    'Long Beach, CA': '245950',
    'Los Angeles, CA': '300527',
    'McKinney, TX ': '568503',
    'Menifee, CA': '228342',
    'Mesa, AZ': '497618',
    'Mid Cities, CA': '764893',
    'Mid Phoenix, AZ': '',
    'Milwaukie, OR': '707289',
    'Miramar, FL': '347920',
    'Modesto, CA': '289688',
    'Monrovia, CA': '264885',
    'Monterey, CA': '522220',
    'Moreno Valley, CA': '276772',
    'North Dallas (Farmers Branch), TX': '837070',
    'Northridge, CA': '264885',
    'Oceanside, CA': '192329',
    'Orlando, FL': '783641',
    'Oxnard, CA': '241280',
    'Palm Desert, CA': '726432',
    'Parma, OH': '906879',
    'Pasadena, CA': '228343',
    'Peoria, AZ': '748408',
    'Perris, CA': '963',
    'Phoenix, AZ': '-314525',
    'Pico Riveria, CA': '253486',
    'Pittsburgh, PA': '953792',
    'Rancho, CA': '143922',
    'Redlands, CA': '143945',
    'Richardson, TX': '353209',
    'Riverside, CA': '143948',
    'Round Rock, TX': '637731',
    'San Antonio, TX': '442521',
    'San Bernardino, CA': '663134',
    'San Dimas, CA': '274359',
    'San Fernando, CA': '264885',
    'San Jose, CA': '461323',
    'San Juan Capistrano, CA': '819476',
    'San Marcos, CA': '',
    'Santa Ana, CA': '542643',
    'Santa Barbara, CA': '420012',
    'Santa Clarita, CA': '264885',
    'Santa Maria, CA': '570071',
    'Sarasota, FL': '525810',
    'Silverlake, CA': '833754',
    'Simi Valley, CA': '712144',
    'South Fort Worth, TX': '761241',
    'Stockton, CA': '994773',
    'Sunrise, FL': '694338',
    'Surprise, AZ': '863734',
    'Suwanee, GA': '402019',
    'Temecula, CA': '142187',
    'Thousand Oaks, CA': '198685',
    'Tijuana/Zona Rio, MEX': '551868',
    'Torrance, CA': '962571',
    'Van Nuys, CA': '264885',
    'Vancouver, WA': '477491',
    'Ventura, CA': '633911',
    'West Chula Vista, CA': '616363',
    'West Covina, CA': '264885',
    'Westminster, CA': '275479',
    'Wheeling, IL': '909945',
    'Woodland Hills, CA': '345827',
    'Zona Dorada Mexicali, MEX': '557811'
}

export default LocationList;