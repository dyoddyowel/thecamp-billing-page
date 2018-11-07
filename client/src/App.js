import React, { Component } from 'react';
import BillingForm from './components/billingForm';
import LocationList from './components/locationList';
import EmailAddress from './components/emailAddress';
import logo from './logo.png';
import './App.css';
import './bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ThankYou from './components/thankYou';

const StepComponent = ({ step, components, nextSection }) => {
  return(
    <div id="component_box">
      { components[step] }
    </div>
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      data: {},
      components: {
        1: <EmailAddress saveData={this.saveEmailData} />,
        2: <BillingForm saveData={this.saveData} handleSubmit={this.handleSubmit} />,
        3: <ThankYou />
      },
    };
  }
  
  saveEmailData = async (x) => {
    x['TagID'] = this.state.data.TagID;
    this.saveData(x);
    const response = await fetch('/api/infusionsoft', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(x),
    });
    const body = await response.text();
    console.log(body);
  }

  saveSiteID = async (data) => {
    const newData = Object.assign({}, this.state.data, data);
    await this.setState({ data: newData }, () => {
      console.log("submitted", this.state);
    });
    return this.state;
  }

  saveData = async (data) => {
    const newData = Object.assign({}, this.state.data, data);
    console.log(newData)
    await this.setState({ data: newData }, () => {
      console.log("submitted", this.state);
      this.nextSection();
    });
    return this.state;
  }

  nextSection = () => {
    let nextStep = this.state.step + 1;
    this.setState({ step: nextStep }, () => {
      console.log(this.state);
    });
  };

  handleSubmit = async (x) => {
    let d = await this.saveData(x);
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.data),
    });
    const body = await response.text();
    console.log(body);
  };

  render() {
    return (
      <Router>
        <div className="App">
            <div>
              <img src={logo} alt="The Camp" />
            </div>
            <Route path="/:id" render={props => <LocationList {...props} saveData={this.saveSiteID} locations={locations} /> } />
              <div className="block focused">
                <StepComponent 
                  step={this.state.step}
                  components={this.state.components}
                  nextSection={this.nextSection} />
              </div>
        </div>
      </Router>
    );
  }
}

export default App;

const locations = {
  'Anaheim': {
    siteID: '172426',
    programID: '10579',
    tagID: '2970',
  },
  'Arcadia': {
    siteID: '505838',
    programID: '100115',
    tagID: '2972',
  },
  'Arlington': {
    siteID: '469848',
    programID: '10311',
    tagID: '2974',
  },
  'Bakersfield': {
    siteID: '539757',
    programID: '',
    tagID: '2976',
  },
  'Bell': {
    siteID: '273870',
    programID: '',
    tagID: '2978',
  },
  'Burbank': {
    siteID: '264885',
    programID: '',
    tagID: '2980',
  },
  'Burnsville': {
    siteID: '441415',
    programID: '100025',
    tagID: '3076',
  },
  'Calexico': {
    siteID: '620570',
    programID: '100055',
    tagID: '2982',
  },
  'Carson': {
    siteID: '298511',
    programID: '',
    tagID: '2984',
  },
  'Chatsworth': {
    siteID: '3324',
    programID: '10462',
    tagID: '2986',
  },
  'Chino': {
    siteID: '143922',
    programID: '11019',
    tagID: '2988',
  },
  'Chula-Vista': {
    siteID: '248377',
    programID: '10275',
    tagID: '2990',
  },
  'Clearwater': {
    siteID: '698580',
    programID: '',
    tagID: '2992',
  },
  'Clovis': {
    siteID: '569158',
    programID: '100012',
    tagID: '2994',
  },
  'Colorado-Springs': {
    siteID: '735761',
    programID: '10239',
    tagID: '2996',
  },
  'Corona': {
    siteID: '233',
    programID: '',
    tagID: '2998',
  },
  'Costa-Mesa': {
    siteID: '221376',
    programID: '10295',
    tagID: '3000',
  },
  'Cypress': {
    siteID: '278263',
    programID: '10389',
    tagID: '3002',
  },
  'Davie': {
    siteID: '257960',
    programID: '10257',
    tagID: '3004',
  },
  'Downey ': {
    siteID: '273870',
    programID: '',
    tagID: '3006',
  },
  'Draper': {
    siteID: '414648',
    programID: '10313',
    tagID: '3008',
  },
  'East-Los-Angeles': {
    siteID: '253486',
    programID: '10525',
    tagID: '3010',
  },
  'El-Cajon': {
    siteID: '347909',
    programID: '10254',
    tagID: '3012',
  },
  'El-Monte': {
    siteID: '264885',
    programID: '',
    tagID: '3014',
  },
  'Escondido': {
    siteID: '581912',
    programID: '',
    tagID: '3016',
  },
  'Fontana': {
    siteID: '143931',
    programID: '10954',
    tagID: '3018',
  },
  'Fort-Worth': {
    siteID: '834435',
    programID: '10445',
    tagID: '3020',
  },
  'Fresno': {
    siteID: '-724509',
    programID: '10225',
    tagID: '3022',
  },
  'Galerias-Mexicali': {
    siteID: '524525',
    programID: '',
    tagID: '3024',
  },
  'Gilbert': {
    siteID: '589611',
    programID: '10501',
    tagID: '3026',
  },
  'Hemet': {
    siteID: '-291840',
    programID: '10597',
    tagID: '3028',
  },
  'High-Desert': {
    siteID: '191573',
    programID: '10416',
    tagID: '3030',
  },
  'Highland-Hts': {
    siteID: '912776',
    programID: '10314',
    tagID: '3032',
  },
  'Houston': {
    siteID: '-879013',
    programID: '',
    tagID: '3034',
  },
  'Humble': {
    siteID: '682932',
    programID: '101076',
    tagID: '3036',
  },
  'Huntington-Beach': {
    siteID: '441683',
    programID: '10306',
    tagID: '3038',
  },
  'Inglewood': {
    siteID: '740074',
    programID: '',
    tagID: '3040',
  },
  'Irvine': {
    siteID: '228344',
    programID: '10302',
    tagID: '3042',
  },
  'Jacksonville': {
    siteID: '715841',
    programID: '10322',
    tagID: '3044',
  },
  'Kearny-Mesa': {
    siteID: '528419',
    programID: '10269',
    tagID: '3046',
  },
  'La-Mirada': {
    siteID: '273870',
    programID: '',
    tagID: '3048',
  },
  'La-Puente': {
    siteID: '136390',
    programID: '10227',
    tagID: '3050',
  },
  'Laguna': {
    siteID: '221032',
    programID: '10286',
    tagID: '3052',
  },
  'Lake-Elsinore': {
    siteID: '963',
    programID: '10303',
    tagID: '3054',
  },
  'Lake-Forest': {
    siteID: '274470',
    programID: '10297',
    tagID: '3056',
  },
  'Lancaster': {
    siteID: '149049',
    programID: '10602',
    tagID: '3058',
  },
  'Long-Beach': {
    siteID: '245950',
    programID: '10337',
    tagID: '3060',
  },
  'Los-Angeles': {
    siteID: '300527',
    programID: '10198',
    tagID: '3062',
  },
  'McKinney ': {
    siteID: '568503',
    programID: '100064',
    tagID: '3066',
  },
  'Menifee': {
    siteID: '228342',
    programID: '10297',
    tagID: '3068',
  },
  'Mesa': {
    siteID: '497618',
    programID: '',
    tagID: '3070',
  },
  'Mid-Cities': {
    siteID: '764893',
    programID: '10238',
    tagID: '3064',
  },
  'Mid-Phoenix': {
    siteID: '',
    programID: '',
    tagID: '3072',
  },
  'Milwaukie': {
    siteID: '707289',
    programID: '10322',
    tagID: '3074',
  },
  'Miramar': {
    siteID: '347920',
    programID: '10235',
    tagID: '3078',
  },
  'Modesto': {
    siteID: '289688',
    programID: '',
    tagID: '3080',
  },
  'Monrovia': {
    siteID: '264885',
    programID: '',
    tagID: '3082',
  },
  'Monterey': {
    siteID: '522220',
    programID: '103089',
    tagID: '3084',
  },
  'Moreno-Valley': {
    siteID: '276772',
    programID: '10655',
    tagID: '3086',
  },
  'North-Dallas': {
    siteID: '837070',
    programID: '',
    tagID: '3088',
  },
  'Northridge': {
    siteID: '264885',
    programID: '',
    tagID: '3090',
  },
  'Oceanside': {
    siteID: '192329',
    programID: '10288',
    tagID: '3092',
  },
  'Orlando': {
    siteID: '783641',
    programID: '101046',
    tagID: '3094',
  },
  'Oxnard': {
    siteID: '241280',
    programID: '10603',
    tagID: '3096',
  },
  'Palm-Desert': {
    siteID: '726432',
    programID: '',
    tagID: '3098',
  },
  'Parma': {
    siteID: '906879',
    programID: '100064',
    tagID: '3100',
  },
  'Pasadena': {
    siteID: '228343',
    programID: '10282',
    tagID: '3102',
  },
  'Peoria': {
    siteID: '748408',
    programID: '103067',
    tagID: '3104',
  },
  'Perris': {
    siteID: '963',
    programID: '10304',
    tagID: '3106',
  },
  'Phoenix': {
    siteID: '-314525',
    programID: '10311',
    tagID: '3108',
  },
  'Pico-Riveria': {
    siteID: '253486',
    programID: '10525',
    tagID: '3110',
  },
  'Pittsburgh': {
    siteID: '953792',
    programID: '',
    tagID: ''
  },
  'Rancho': {
    siteID: '143922',
    programID: '11019',
    tagID: '3112',
  },
  'Redlands': {
    siteID: '143945',
    programID: '10690',
    tagID: '3114',
  },
  'Richardson': {
    siteID: '353209',
    programID: '',
    tagID: '3116',
  },
  'Riverside': {
    siteID: '143948',
    programID: '10665',
    tagID: '3118',
  },
  'Round-Rock': {
    siteID: '637731',
    programID: '100064',
    tagID: '3120',
  },
  'San-Antonio': {
    siteID: '442521',
    programID: '10290',
    tagID: '3122',
  },
  'San-Bernardino': {
    siteID: '663134',
    programID: '101103',
    tagID: '3124',
  },
  'San-Dimas': {
    siteID: '274359',
    programID: '10327',
    tagID: '3126',
  },
  'San-Fernando': {
    siteID: '264885',
    programID: '',
    tagID: '3128',
  },
  'San-Jose': {
    siteID: '461323',
    programID: '102095',
    tagID: '3130',
  },
  'San-Juan-Capistrano': {
    siteID: '819476',
    programID: '',
    tagID: '3132',
  },
  'San-Marcos': {
    siteID: '',
    programID: '',
    tagID: '',
  },
  'Santa-Ana': {
    siteID: '542643',
    programID: '10283',
    tagID: '3134',
  },
  'Santa-Barbara': {
    siteID: '420012',
    programID: '100048',
    tagID: '3136',
  },
  'Santa-Clarita': {
    siteID: '264885',
    programID: '',
    tagID: '3138',
  },
  'Santa-Maria': {
    siteID: '570071',
    programID: '100046',
    tagID: '3140',
  },
  'Sarasota': {
    siteID: '525810',
    programID: '10229',
    tagID: '3142',
  },
  'Silverlake': {
    siteID: '833754',
    programID: '101020',
    tagID: '3144',
  },
  'Simi-Valley': {
    siteID: '712144',
    programID: '101136',
    tagID: '3146',
  },
  'South-Fort-Worth': {
    siteID: '761241',
    programID: '100053',
    tagID: '3150',
  },
  'Stockton': {
    siteID: '994773',
    programID: '101237',
    tagID: '3152',
  },
  'Sunrise': {
    siteID: '694338',
    programID: '11271',
    tagID: '3154',
  },
  'Surprise': {
    siteID: '863734',
    programID: '10257',
    tagID: '3156',
  },
  'Suwanee': {
    siteID: '402019',
    programID: '10368',
    tagID: '3158',
  },
  'Temecula': {
    siteID: '142187',
    programID: '10973',
    tagID: '3160',
  },
  'Thousand-Oaks': {
    siteID: '198685',
    programID: '10618',
    tagID: '3162',
  },
  'Tijuana/Zona-Rio': {
    siteID: '551868',
    programID: '',
    tagID: ''
  },
  'Torrance': {
    siteID: '962571',
    programID: '',
    tagID: ''
  },
  'Van-Nuys': {
    siteID: '264885',
    programID: '',
    tagID: '3166',
  },
  'Vancouver': {
    siteID: '477491',
    programID: '',
    tagID: '3164',
  },
  'Ventura': {
    siteID: '633911',
    programID: '',
    tagID: '3168',
  },
  'West-Chula-Vista': {
    siteID: '616363',
    programID: '',
    tagID: '3170',
  },
  'West-Covina': {
    siteID: '264885',
    programID: '',
    tagID: '3172',
  },
  'Westminster': {
    siteID: '275479',
    programID: '',
    tagID: '3174',
  },
  'Wheeling': {
    siteID: '909945',
    programID: '',
    tagID: '3176',
  },
  'Woodland-Hills': {
    siteID: '345827',
    programID: '',
    tagID: '3178',
  },
  'Zona-Dorada-Mexicali': {
    tagID: '3180',
    siteID: '557811',
    programID: '',

  },
}