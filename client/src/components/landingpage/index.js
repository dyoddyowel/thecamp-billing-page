import React, { Component } from 'react';
import BillingForm from '../billingForm';
import LocationList from '../locationList';
import EmailAddress from '../emailAddress';
import ReactPixel from 'react-facebook-pixel';
import ThankYou from '../thankYou';
import locations from '../../locations2';
import ReactGA from 'react-ga';

const StepComponent = ({ step, components, nextSection }) => {
  return(
    <div id="component_box">
      { components[step] }
    </div>
  );
}

class LandingPage extends Component {
  constructor(props) {
    super(props);
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

  nextSection = () => {
    let nextStep = this.state.step + 1;
    this.setState({ step: nextStep });
    ReactGA.pageview(window.location.pathname + window.location.search);
  };

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

  render() {
    return(
      <React.Fragment>
        <div>
          <LocationList {...this.props} 
            saveData={this.saveSiteID}
            locations={locations}
            initPixel={this.initPixel} />
        </div>
        <div className="block focused">
          <StepComponent 
            step={this.state.step}
            components={this.state.components}
            nextSection={this.nextSection} />
        </div>
      </React.Fragment>
    );
  }
}

export default LandingPage;