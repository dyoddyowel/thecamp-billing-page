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
    programID: ''
  },
  'Calexico': {
    siteID: '620570',
    programID: ''
  },
  'Carson': {
    siteID: '298511',
    programID: ''
  },
  'Chatsworth': {
    siteID: '3324',
    programID: ''
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
    programID: ''
  },
  'Colorado-Springs': {
    siteID: '735761',
    programID: ''
  },
  'Corona': {
    siteID: '233',
    programID: ''
  },
  'Costa-Mesa': {
    siteID: '221376',
    programID: ''
  },
  'Cypress': {
    siteID: '278263',
    programID: ''
  },
  'Davie': {
    siteID: '257960',
    programID: ''
  },
  'Downey ': {
    siteID: '273870',
    programID: ''
  },
  'Draper': {
    siteID: '414648',
    programID: ''
  },
  'East-Los-Angeles': {
    siteID: '253486',
    programID: ''
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
    programID: ''
  },
  'Fort-Worth': {
    siteID: '834435',
    programID: ''
  },
  'Fresno': {
    siteID: '-724509',
    programID: ''
  },
  'Galerias-Mexicali': {
    siteID: '524525',
    programID: ''
  },
  'Gilbert': {
    siteID: '589611',
    programID: ''
  },
  'Hemet': {
    siteID: '-291840',
    programID: ''
  },
  'High-Desert': {
    siteID: '191573',
    programID: ''
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
    programID: ''
  },
  'Huntington-Beach': {
    siteID: '441683',
    programID: ''
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
    programID: ''
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
    programID: ''
  },
  'Laguna': {
    siteID: '221032',
    programID: '10286'
  },
  'Lake-Elsinore': {
    siteID: '963',
    programID: ''
  },
  'Lake-Forest': {
    siteID: '274470',
    programID: ''
  },
  'Lancaster': {
    siteID: '149049',
    programID: ''
  },
  'Long-Beach': {
    siteID: '245950',
    programID: ''
  },
  'Los-Angeles': {
    siteID: '300527',
    programID: ''
  },
  'McKinney ': {
    siteID: '568503',
    programID: ''
  },
  'Menifee': {
    siteID: '228342',
    programID: ''
  },
  'Mesa': {
    siteID: '497618',
    programID: ''
  },
  'Mid-Cities': {
    siteID: '764893',
    programID: ''
  },
  'Mid-Phoenix': {
    siteID: '',
    programID: ''
  },
  'Milwaukie': {
    siteID: '707289',
    programID: ''
  },
  'Miramar': {
    siteID: '347920',
    programID: ''
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
    programID: ''
  },
  'Moreno-Valley': {
    siteID: '276772',
    programID: ''
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
    programID: ''
  },
  'Oxnard': {
    siteID: '241280',
    programID: ''
  },
  'Palm-Desert': {
    siteID: '726432',
    programID: ''
  },
  'Parma': {
    siteID: '906879',
    programID: ''
  },
  'Pasadena': {
    siteID: '228343',
    programID: '10282'
  },
  'Peoria': {
    siteID: '748408',
    programID: ''
  },
  'Perris': {
    siteID: '963',
    programID: ''
  },
  'Phoenix': {
    siteID: '-314525',
    programID: ''
  },
  'Pico-Riveria': {
    siteID: '253486',
    programID: ''
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
    programID: ''
  },
  'Richardson': {
    siteID: '353209',
    programID: ''
  },
  'Riverside': {
    siteID: '143948',
    programID: ''
  },
  'Round-Rock': {
    siteID: '637731',
    programID: ''
  },
  'San-Antonio': {
    siteID: '442521',
    programID: ''
  },
  'San-Bernardino': {
    siteID: '663134',
    programID: ''
  },
  'San-Dimas': {
    siteID: '274359',
    programID: ''
  },
  'San-Fernando': {
    siteID: '264885',
    programID: ''
  },
  'San-Jose': {
    siteID: '461323',
    programID: ''
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
    programID: ''
  },
  'Santa-Barbara': {
    siteID: '420012',
    programID: ''
  },
  'Santa-Clarita': {
    siteID: '264885',
    programID: ''
  },
  'Santa-Maria': {
    siteID: '570071',
    programID: ''
  },
  'Sarasota': {
    siteID: '525810',
    programID: ''
  },
  'Silverlake': {
    siteID: '833754',
    programID: ''
  },
  'Simi-Valley': {
    siteID: '712144',
    programID: ''
  },
  'South-Fort-Worth': {
    siteID: '761241',
    programID: ''
  },
  'Stockton': {
    siteID: '994773',
    programID: ''
  },
  'Sunrise': {
    siteID: '694338',
    programID: ''
  },
  'Surprise': {
    siteID: '863734',
    programID: ''
  },
  'Suwanee': {
    siteID: '402019',
    programID: ''
  },
  'Temecula': {
    siteID: '142187',
    programID: ''
  },
  'Thousand-Oaks': {
    siteID: '198685',
    programID: ''
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