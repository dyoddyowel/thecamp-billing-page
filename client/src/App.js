import React, { Component } from 'react';
import BillingForm from './components/billingForm';
import LocationList from './components/locationList';
import EmailAddress from './components/emailAddress';
import logo from './logo.png';
import './App.css';
import './bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ThankYou from './components/thankYou';
import locations from './locations';
import ReactPixel from 'react-facebook-pixel';

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
        1: <EmailAddress saveData={this.saveEmailData} pixelView={ReactPixel.pageView} startCheckout={ReactPixel.track}/>,
        2: <BillingForm saveData={this.saveData} handleSubmit={this.handleSubmit} pixelView={ReactPixel.pageView}/>,
        3: <ThankYou pixelView={ReactPixel.pageView}/>
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

  initPixel = (pixelID) => {
    console.log("pixel id", pixelID)
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
    ReactPixel.track('Purchase', {
      'currency': 'usd',
      'value': 97.0
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
            <div>
              <img src={logo} alt="The Camp" />
            </div>
            <Route path="/:id" render={props => <LocationList {...props} saveData={this.saveSiteID} locations={locations} initPixel={this.initPixel} /> } />
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