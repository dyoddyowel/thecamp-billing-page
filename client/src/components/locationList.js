import React, { Component } from 'react';

class LocationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.match.params.id,
        };
    }

    renderLocations = (options) => {
        let keys = Object.keys(options);
        let values = Object.values(options);
        let arr = [];
        for(let i of keys.keys()) {
            let x = <option value={values[i]} key={i}>{keys[i]}</option>
            arr.push(x);
        }
        return arr;
    }

    onChange = (e) => {
        const key = Object.keys(locations).find(key => locations[key] === e.target.value);
        this.setState({ selected: key });
        e.target.style.display = 'none';
        // e.target.class = 'hide';
    }

    render() {
        return(
            <div>
                <h2 class="proper">{this.state.selected}</h2>
                <select onChange={this.onChange} value={this.state.selected} >
                    {
                        this.renderLocations(locations)
                    }
                </select>
            </div>
        );
    }
}

const locations = {
    'Locations': '',
    'Anaheim': '172426',
    'Arcadia': '505838',
    'Arlington': '469848',
    'Bakersfield': '539757',
    'Bell': '273870',
    'Burbank': '264885',
    'Burnsville': '441415',
    'Calexico': '620570',
    'Carson': '298511',
    'Chatsworth': '3324',
    'Chino': '143922',
    'Chula Vista': '248377',
    'Clearwater': '698580',
    'Clovis': '569158',
    'Colorado Springs': '735761',
    'Corona': '233',
    'Costa Mesa': '221376',
    'Cypress': '278263',
    'Davie': '257960',
    'Downey  ': '273870',
    'Draper': '414648',
    'East Los Angeles': '253486',
    'El Cajon': '347909',
    'El Monte': '264885',
    'Escondido': '581912',
    'Fontana': '143931',
    'Fort Worth': '834435',
    'Fresno': '-724509',
    'Galerias Mexicali': '524525',
    'Gilbert': '589611',
    'Hemet': '-291840',
    'High Desert': '191573',
    'Highland Hts': '912776',
    'Houston': '-879013',
    'Humble': '682932',
    'Huntington Beach': '441683',
    'Inglewood': '740074',
    'Irvine': '228344',
    'Jacksonville': '715841',
    'Kearny Mesa': '528419',
    'La Mirada': '273870',
    'La Puente': '136390',
    'Laguna': '221032',
    'Lake Elsinore': '963',
    'Lake Forest': '274470',
    'Lancaster': '149049',
    'Long Beach': '245950',
    'Los Angeles': '300527',
    'McKinney ': '568503',
    'Menifee': '228342',
    'Mesa': '497618',
    'Mid Cities': '764893',
    'Mid Phoenix': '',
    'Milwaukie': '707289',
    'Miramar': '347920',
    'Modesto': '289688',
    'Monrovia': '264885',
    'Monterey': '522220',
    'Moreno Valley': '276772',
    'North Dallas': '837070',
    'Northridge': '264885',
    'Oceanside': '192329',
    'Orlando': '783641',
    'Oxnard': '241280',
    'Palm Desert': '726432',
    'Parma': '906879',
    'Pasadena': '228343',
    'Peoria': '748408',
    'Perris': '963',
    'Phoenix': '-314525',
    'Pico Riveria': '253486',
    'Pittsburgh': '953792',
    'Rancho': '143922',
    'Redlands': '143945',
    'Richardson': '353209',
    'Riverside': '143948',
    'Round Rock': '637731',
    'San Antonio': '442521',
    'San Bernardino': '663134',
    'San Dimas': '274359',
    'San Fernando': '264885',
    'San Jose': '461323',
    'San Juan Capistrano': '819476',
    'San Marcos': '',
    'Santa Ana': '542643',
    'Santa Barbara': '420012',
    'Santa Clarita': '264885',
    'Santa Maria': '570071',
    'Sarasota': '525810',
    'Silverlake': '833754',
    'Simi Valley': '712144',
    'South Fort Worth': '761241',
    'Stockton': '994773',
    'Sunrise': '694338',
    'Surprise': '863734',
    'Suwanee': '402019',
    'Temecula': '142187',
    'Thousand Oaks': '198685',
    'Tijuana/Zona Rio': '551868',
    'Torrance': '962571',
    'Van Nuys': '264885',
    'Vancouver': '477491',
    'Ventura': '633911',
    'West Chula Vista': '616363',
    'West Covina': '264885',
    'Westminster': '275479',
    'Wheeling': '909945',
    'Woodland Hills': '345827',
    'Zona Dorada Mexicali': '557811'
}

export default LocationList;