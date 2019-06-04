import React, { Component } from 'react';
import BillingForm from './components/billingForm';
import LocationList from './components/locationList';
import EmailAddress from './components/emailAddress';
import logo from './logo.png';
import './App.css';
import './bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ThankYou from './components/thankYou';
import locations from './locations2';
import ReactPixel from 'react-facebook-pixel';
import HeaderBanner from './components/landingpage/headerBanner';
import ReactGA from 'react-ga';

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
      error: false,
      data: {},
      components: {
        1: <EmailAddress nextSection={this.nextSection} saveData={this.saveEmailData} pixelView={ReactPixel.pageView} startCheckout={ReactPixel.track}/>,
        2: <BillingForm saveData={this.saveData} handleSubmit={this.handleSubmit} pixelView={ReactPixel.pageView}/>,
        3: <ThankYou pixelView={ReactPixel.pageView}/>
      },
    };
  }

  componentDidMount() {
    ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID);
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
    await response.text();
  }

  initPixel = (pixelID) => {
    const advancedMatching = { 
        // em: 'some@email.com'
    }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/pixel-with-ads/conversion-tracking#advanced_match
    const options = {
        autoConfig: true, 	// set pixel's autoConfig
        debug: false, 		// enable logs
    };
    ReactPixel.init(pixelID, advancedMatching, options);
    ReactPixel.pageView(); 		
  }

  saveSiteID = async (data) => {
    const newData = Object.assign({}, this.state.data, data);
    await this.setState({ data: newData });
    return this.state;
  }

  saveData = async (data) => {
    const newData = Object.assign({}, this.state.data, data);
    await this.setState({ data: newData });
    return this.state;
  }

  nextSection = () => {
    let nextStep = this.state.step + 1;
    this.setState({ step: nextStep });
    ReactGA.pageview(window.location.pathname + window.location.search);
  };

  handleSubmit = async (x) => {
    this.setState({ error: false });
    await this.saveData(x);
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.data),
    });

    const status = await response.text();
    if(status === "Success") {
      this.nextSection();
      ReactPixel.track('Purchase', {
        'currency': 'USD',
        'value': 37.0
      });
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <Router>
        <div className="App">
            <HeaderBanner />
            <div id="logo-container">
              <img src={logo} alt="The Camp" />
            </div>
            {
              this.state.error ? <ErrorComponent /> : <span></span>
            }
            <Route path="/location/:id" render={props => <LocationList {...props} saveData={this.saveSiteID} locations={locations} initPixel={this.initPixel} /> } />
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

const ErrorComponent = () => (
  <div className="error">
    Unable to complete Purchase. Please Check Your Payment Details.
  </div>
);

export default App;
