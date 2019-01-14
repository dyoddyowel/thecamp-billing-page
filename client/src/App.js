import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import './bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import locations from './locations2';
import ReactPixel from 'react-facebook-pixel';
import HeaderBanner from './components/landingpage/headerBanner';
import ReactGA from 'react-ga';
import BillingHotLink from './components/billingHotLink';
import LandingPage from './components/landingpage/index';
import ErrorComponent from './components/error';
import FooterLinks from './components/footerLinks';

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }


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
        'value': 21.0
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
            <Route path="/:id/landing" render={props => <LandingPage {...props} saveData={this.saveSiteID} locations={locations} initPixel={this.initPixel} /> } />
            <Route path="/:id/billing" render={ props => 
                      <BillingHotLink {...props}
                        nextSection={this.nextSection}
                        saveEmailData={this.saveEmailData}
                        startCheckout={ReactPixel.track}
                        saveData={this.saveData}
                        handleSubmit={this.handleSubmit}
                        pixelView={ReactPixel.pageView}
                        locations={locations} />} 
            />
            <FooterLinks />
        </div>
      </Router>
    );
  }
}

export default App;