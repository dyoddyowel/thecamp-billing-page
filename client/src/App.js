import React, { Component } from 'react';
import BillingForm from './components/billingForm';
import LocationList from './components/locationList';
import EmailAddress from './components/emailAddress';
import logo from './logo.png';
import './App.css';
import './bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from './components/landingPage';
import ThankYou from './components/thankYou';

// const NextButton = ({ nextSection }) => {
//   const clickHandler = (e) => {
//     nextSection();
//   }
//   return (
//     <div onClick={clickHandler} className="btn">Next</div>
//   );
// }

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
  'Chula-Vista': '248377',
  'Clearwater': '698580',
  'Clovis': '569158',
  'Colorado-Springs': '735761',
  'Corona': '233',
  'Costa-Mesa': '221376',
  'Cypress': '278263',
  'Davie': '257960',
  'Downey ': '273870',
  'Draper': '414648',
  'East-Los-Angeles': '253486',
  'El-Cajon': '347909',
  'El-Monte': '264885',
  'Escondido': '581912',
  'Fontana': '143931',
  'Fort-Worth': '834435',
  'Fresno': '-724509',
  'Galerias-Mexicali': '524525',
  'Gilbert': '589611',
  'Hemet': '-291840',
  'High-Desert': '191573',
  'Highland-Hts': '912776',
  'Houston': '-879013',
  'Humble': '682932',
  'Huntington-Beach': '441683',
  'Inglewood': '740074',
  'Irvine': '228344',
  'Jacksonville': '715841',
  'Kearny-Mesa': '528419',
  'La-Mirada': '273870',
  'La-Puente': '136390',
  'Laguna': '221032',
  'Lake-Elsinore': '963',
  'Lake-Forest': '274470',
  'Lancaster': '149049',
  'Long-Beach': '245950',
  'Los-Angeles': '300527',
  'McKinney ': '568503',
  'Menifee': '228342',
  'Mesa': '497618',
  'Mid-Cities': '764893',
  'Mid-Phoenix': '',
  'Milwaukie': '707289',
  'Miramar': '347920',
  'Modesto': '289688',
  'Monrovia': '264885',
  'Monterey': '522220',
  'Moreno-Valley': '276772',
  'North-Dallas': '837070',
  'Northridge': '264885',
  'Oceanside': '192329',
  'Orlando': '783641',
  'Oxnard': '241280',
  'Palm-Desert': '726432',
  'Parma': '906879',
  'Pasadena': '228343',
  'Peoria': '748408',
  'Perris': '963',
  'Phoenix': '-314525',
  'Pico-Riveria': '253486',
  'Pittsburgh': '953792',
  'Rancho': '143922',
  'Redlands': '143945',
  'Richardson': '353209',
  'Riverside': '143948',
  'Round-Rock': '637731',
  'San-Antonio': '442521',
  'San-Bernardino': '663134',
  'San-Dimas': '274359',
  'San-Fernando': '264885',
  'San-Jose': '461323',
  'San-Juan-Capistrano': '819476',
  'San-Marcos': '',
  'Santa-Ana': '542643',
  'Santa-Barbara': '420012',
  'Santa-Clarita': '264885',
  'Santa-Maria': '570071',
  'Sarasota': '525810',
  'Silverlake': '833754',
  'Simi-Valley': '712144',
  'South-Fort-Worth': '761241',
  'Stockton': '994773',
  'Sunrise': '694338',
  'Surprise': '863734',
  'Suwanee': '402019',
  'Temecula': '142187',
  'Thousand-Oaks': '198685',
  'Tijuana/Zona-Rio': '551868',
  'Torrance': '962571',
  'Van-Nuys': '264885',
  'Vancouver': '477491',
  'Ventura': '633911',
  'West-Chula-Vista': '616363',
  'West-Covina': '264885',
  'Westminster': '275479',
  'Wheeling': '909945',
  'Woodland-Hills': '345827',
  'Zona-Dorada-Mexicali': '557811'
}