import React, { Component } from 'react';
import BillingForm from './billingForm';
import EmailBox from './emailBox';
import ReactPixel from 'react-facebook-pixel';

class BillingHotLink extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

//TODO: export out the Email Address section
  saveData = async (data) => {
    const newData = Object.assign({}, this.state.data, data);
    await this.setState({ data: newData });
    return this.state;
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
    return(
      <div>
        <EmailBox 
          saveData={this.saveEmailData}
          nextSection={this.props.nextSection} 
          pixelView={this.props.pixelView}
          startCheckout={this.props.pixelView } />
        <BillingForm
          saveData={this.saveData} 
          handleSubmit={this.handleSubmit} 
          pixelView={this.props.pixelView} />
      </div>
    );
  }
}

export default BillingHotLink;