import React, { Component } from 'react';
import EmailBox from './emailBox';
import postcode from 'postcode-validator';
import ReactPixel from 'react-facebook-pixel';
import PaymentForm from './paymentForm';
import BillingAddress from './billingAddress';
import AdCopy from './landingpage/adCopy';
import { capitalize } from '../helpers';
import ThankYou from './thankYou';
import ErrorComponent from './error';
import PromoDetails from './landingpage/promoDetails';
import Video from './landingpage/adVideo';

//TODO: Implement Thank You Page
//TODO: Implement Step Component

const StepComponent = ({ Component }) => (
  <div className="step">
    { Component }
  </div>
);

const BillingPage = ({ 
  saveData,
  pixelView,
  handleEmailChange,
  handleChange,
  handleSubmit,
  nextSection,
  setNewValue,
  disabled,
  amount,
  cc,
  cvc,
  expiry,
  ccName,
  handlePaymentChange,
}) => (
  <React.Fragment>
    <PromoDetails
      detailname="Tough Love Training"
      price="21" />
    <Video />
    <AdCopy
      id="billing-copy" />
    <h2 className="form-header">Customer Information</h2>
    <EmailBox 
      saveData={saveData}
      handleChange={handleEmailChange}
      nextSection={nextSection} 
      pixelView={pixelView}
      startCheckout={pixelView } />
    <BillingAddress 
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      setNewValue={setNewValue}
      disabled={disabled} />
    <h2 className="form-header">Payment Information</h2>
    <PaymentForm 
      amount={amount}
      cc={cc}
      cvc={cvc}
      expiry={expiry}
      ccName={ccName} 
      handlePaymentChange={handlePaymentChange}/>
    <button className="primary join-program" onClick={handleSubmit}>Join Program</button>
  </React.Fragment>
);

class BillingHotLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      isDisabled: false,
      ProgramID: '',
      error: false,
      SiteID: '',
      address: {
          "BillingAddress": "",
          "BillingCity": "",
          "BillingState": "",
          "BillingPostalCode": "",
      },
      payment: {
          "amount": 21,
          "number": "",
          "expiry": "",
          "cvc": "",
          "name": "",
          "issuer": "",
          "isValid": false
      },
      formErrors: {
          
      }
    };
  }

  nextSection = () => {
    let steps = this.state.steps + 1;
    this.setState({ steps: steps });
  }

//TODO: export out the Email Address section
  saveData = async (data) => {
    const newData = Object.assign({}, this.state.data, data);
    await this.setState({ data: newData });
    return this.state;
  }

  handleEmailChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.validateEverything();
  }

  handlePaymentChange = (data) => {
    let x = {
        ...this.state.payment,
        ...data
    };
    this.setState({ payment: x }, () => {
      console.log(this.state)
    });
  }

  saveEmailData = async (x) => {

  }

  handleChange = (e) => {
    let x = this.state.address;
    x[e.target.id] = e.target.value;
    this.setState({ address: x });
    this.validateEverything();
  }

  validateEverything = () => {
    if(postcode.validate(this.state.address.BillingPostalCode, 'US') && this.state.payment.isValid) {  
        this.setState({ isDisabled: false });
    } else {
        this.setState({ isDisabled: false });
    }
}

  handleSubmit = async (x) => {
    this.setState({ error: false });
    let a = this.props.locations;
    let t = capitalize(this.props.match.params.id);
    this.setState({ SiteID: a[t]['siteID'], ProgramID: a[t]['programID'], PixelID: a[t]['pixelID']})
    const response = await fetch('/api/billing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    });

    const status = await response.text();
    if(status === "Success") {
      this.nextSection();
      ReactPixel.track('Purchase', {
        'currency': 'USD',
        'value': 21.0
      });
      this.setState({ complete: true });
    } else {
      this.setState({ error: true });
    }
  };

  setNewValue = (newValue) => {
    let x = {
        ...this.state.address
    };
    x["BillingState"] = newValue;
    this.setState({ address: x });
  }

  render() {
    console.log(this.props)
    return(
      <div className="billing">
      {
        this.state.error ? <ErrorComponent /> : <span></span>
      }
      {
        this.state.complete ? <ThankYou 
                                pixelView={this.props.pixelView} /> : 
                              <BillingPage 
                                saveData={this.saveEmailData}
                                handleEmailChange={this.handleEmailChange}
                                nextSection={this.props.nextSection} 
                                pixelView={this.props.pixelView}
                                startCheckout={this.props.pixelView }
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                                setNewValue={this.setNewValue}
                                disabled={this.state.isDisabled}
                                amount={this.state.payment['amount']}
                                cc={this.state.payment['number']}
                                cvc={this.state.payment['cvc']}
                                expiry={this.state.payment['expiry']}
                                ccName={this.state.payment['name']} 
                                handlePaymentChange={this.handlePaymentChange} />
      }
      </div>
    );
  }
}



export default BillingHotLink;