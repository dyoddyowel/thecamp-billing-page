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
      components: {
        1: <EmailAddress saveData={this.saveData} />,
        2: <BillingForm saveData={this.saveData} handleSubmit={this.handleSubmit}/>,
        3: <ThankYou />
      },
      data: {}
    };
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
    programID: '10579'
  },
  'Arcadia': {
    siteID: '505838',
    programID: '100115'
  },
  'Arlington': {
    siteID: '469848',
    programID: '10311'
  },
  'Bakersfield': {
    siteID: '539757',
    programID: ''
  },
  'Bell': {
    siteID: '273870',
    programID: ''
  },
  'Burbank': {
    siteID: '264885',
    programID: ''
  },
  'Burnsville': {
    siteID: '441415',
    programID: '100025'
  },
  'Calexico': {
    siteID: '620570',
    programID: '100055'
  },
  'Carson': {
    siteID: '298511',
    programID: ''
  },
  'Chatsworth': {
    siteID: '3324',
    programID: '10462'
  },
  'Chino': {
    siteID: '143922',
    programID: '11019'
  },
  'Chula-Vista': {
    siteID: '248377',
    programID: '10275'
  },
  'Clearwater': {
    siteID: '698580',
    programID: ''
  },
  'Clovis': {
    siteID: '569158',
    programID: '100012'
  },
  'Colorado-Springs': {
    siteID: '735761',
    programID: '10239'
  },
  'Corona': {
    siteID: '233',
    programID: ''
  },
  'Costa-Mesa': {
    siteID: '221376',
    programID: '10295'
  },
  'Cypress': {
    siteID: '278263',
    programID: '10389'
  },
  'Davie': {
    siteID: '257960',
    programID: '10257'
  },
  'Downey ': {
    siteID: '273870',
    programID: ''
  },
  'Draper': {
    siteID: '414648',
    programID: '10313'
  },
  'East-Los-Angeles': {
    siteID: '253486',
    programID: '10525'
  },
  'El-Cajon': {
    siteID: '347909',
    programID: '10254'
  },
  'El-Monte': {
    siteID: '264885',
    programID: ''
  },
  'Escondido': {
    siteID: '581912',
    programID: ''
  },
  'Fontana': {
    siteID: '143931',
    programID: '10954'
  },
  'Fort-Worth': {
    siteID: '834435',
    programID: '10445'
  },
  'Fresno': {
    siteID: '-724509',
    programID: '10225'
  },
  'Galerias-Mexicali': {
    siteID: '524525',
    programID: ''
  },
  'Gilbert': {
    siteID: '589611',
    programID: '10501'
  },
  'Hemet': {
    siteID: '-291840',
    programID: '10597'
  },
  'High-Desert': {
    siteID: '191573',
    programID: '10416'
  },
  'Highland-Hts': {
    siteID: '912776',
    programID: '10314'
  },
  'Houston': {
    siteID: '-879013',
    programID: ''
  },
  'Humble': {
    siteID: '682932',
    programID: '101076'
  },
  'Huntington-Beach': {
    siteID: '441683',
    programID: '10306'
  },
  'Inglewood': {
    siteID: '740074',
    programID: ''
  },
  'Irvine': {
    siteID: '228344',
    programID: '10302'
  },
  'Jacksonville': {
    siteID: '715841',
    programID: '10322'
  },
  'Kearny-Mesa': {
    siteID: '528419',
    programID: '10269'
  },
  'La-Mirada': {
    siteID: '273870',
    programID: ''
  },
  'La-Puente': {
    siteID: '136390',
    programID: '10227'
  },
  'Laguna': {
    siteID: '221032',
    programID: '10286'
  },
  'Lake-Elsinore': {
    siteID: '963',
    programID: '10303'
  },
  'Lake-Forest': {
    siteID: '274470',
    programID: '10297'
  },
  'Lancaster': {
    siteID: '149049',
    programID: '10602'
  },
  'Long-Beach': {
    siteID: '245950',
    programID: '10337'
  },
  'Los-Angeles': {
    siteID: '300527',
    programID: '10198'
  },
  'McKinney ': {
    siteID: '568503',
    programID: '100064'
  },
  'Menifee': {
    siteID: '228342',
    programID: '10297'
  },
  'Mesa': {
    siteID: '497618',
    programID: ''
  },
  'Mid-Cities': {
    siteID: '764893',
    programID: '10238'
  },
  'Mid-Phoenix': {
    siteID: '',
    programID: ''
  },
  'Milwaukie': {
    siteID: '707289',
    programID: '10322'
  },
  'Miramar': {
    siteID: '347920',
    programID: '10235'
  },
  'Modesto': {
    siteID: '289688',
    programID: ''
  },
  'Monrovia': {
    siteID: '264885',
    programID: ''
  },
  'Monterey': {
    siteID: '522220',
    programID: '103089'
  },
  'Moreno-Valley': {
    siteID: '276772',
    programID: '10655'
  },
  'North-Dallas': {
    siteID: '837070',
    programID: ''
  },
  'Northridge': {
    siteID: '264885',
    programID: ''
  },
  'Oceanside': {
    siteID: '192329',
    programID: '10288'
  },
  'Orlando': {
    siteID: '783641',
    programID: '101046'
  },
  'Oxnard': {
    siteID: '241280',
    programID: '10603'
  },
  'Palm-Desert': {
    siteID: '726432',
    programID: ''
  },
  'Parma': {
    siteID: '906879',
    programID: '100064'
  },
  'Pasadena': {
    siteID: '228343',
    programID: '10282'
  },
  'Peoria': {
    siteID: '748408',
    programID: '103067'
  },
  'Perris': {
    siteID: '963',
    programID: '10304'
  },
  'Phoenix': {
    siteID: '-314525',
    programID: '10311'
  },
  'Pico-Riveria': {
    siteID: '253486',
    programID: '10525'
  },
  'Pittsburgh': {
    siteID: '953792',
    programID: ''
  },
  'Rancho': {
    siteID: '143922',
    programID: '11019'
  },
  'Redlands': {
    siteID: '143945',
    programID: '10690'
  },
  'Richardson': {
    siteID: '353209',
    programID: ''
  },
  'Riverside': {
    siteID: '143948',
    programID: '10665'
  },
  'Round-Rock': {
    siteID: '637731',
    programID: '100064'
  },
  'San-Antonio': {
    siteID: '442521',
    programID: '10290'
  },
  'San-Bernardino': {
    siteID: '663134',
    programID: '101103'
  },
  'San-Dimas': {
    siteID: '274359',
    programID: '10327'
  },
  'San-Fernando': {
    siteID: '264885',
    programID: ''
  },
  'San-Jose': {
    siteID: '461323',
    programID: '102095'
  },
  'San-Juan-Capistrano': {
    siteID: '819476',
    programID: ''
  },
  'San-Marcos': {
    siteID: '',
    programID: ''
  },
  'Santa-Ana': {
    siteID: '542643',
    programID: '10283'
  },
  'Santa-Barbara': {
    siteID: '420012',
    programID: '100048'
  },
  'Santa-Clarita': {
    siteID: '264885',
    programID: ''
  },
  'Santa-Maria': {
    siteID: '570071',
    programID: '100046'
  },
  'Sarasota': {
    siteID: '525810',
    programID: '10229'
  },
  'Silverlake': {
    siteID: '833754',
    programID: '101020'
  },
  'Simi-Valley': {
    siteID: '712144',
    programID: '101136'
  },
  'South-Fort-Worth': {
    siteID: '761241',
    programID: '100053'
  },
  'Stockton': {
    siteID: '994773',
    programID: '101237'
  },
  'Sunrise': {
    siteID: '694338',
    programID: '11271'
  },
  'Surprise': {
    siteID: '863734',
    programID: '10257'
  },
  'Suwanee': {
    siteID: '402019',
    programID: '10368'
  },
  'Temecula': {
    siteID: '142187',
    programID: '10973'
  },
  'Thousand-Oaks': {
    siteID: '198685',
    programID: '10618'
  },
  'Tijuana/Zona-Rio': {
    siteID: '551868',
    programID: ''
  },
  'Torrance': {
    siteID: '962571',
    programID: ''
  },
  'Van-Nuys': {
    siteID: '264885',
    programID: ''
  },
  'Vancouver': {
    siteID: '477491',
    programID: ''
  },
  'Ventura': {
    siteID: '633911',
    programID: ''
  },
  'West-Chula-Vista': {
    siteID: '616363',
    programID: ''
  },
  'West-Covina': {
    siteID: '264885',
    programID: ''
  },
  'Westminster': {
    siteID: '275479',
    programID: ''
  },
  'Wheeling': {
    siteID: '909945',
    programID: ''
  },
  'Woodland-Hills': {
    siteID: '345827',
    programID: ''
  },
  'Zona-Dorada-Mexicali': {

    siteID: '557811',
    programID: ''
  },
}